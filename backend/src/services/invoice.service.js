const Invoice = require('../models/billing/Invoice');
const ShipmentRepository = require('../repositories/shipment.repository');
const AppError = require('../utils/AppError');
const roles = require('../constants/roles');
const { randomUUID } = require('crypto');

class InvoiceService {
    async createForShipment(shipmentId, adminId, payload = {}) {
        const shipment = await ShipmentRepository.findById(shipmentId);
        if (!shipment) throw new AppError('Shipment not found', 404);
        if (await Invoice.exists({ shipment: shipmentId })) throw new AppError('Invoice already exists for this shipment', 409);

        const freightAmount = Number(payload.freightAmount ?? shipment.finalPrice);
        if (!Number.isFinite(freightAmount) || freightAmount < 0) throw new AppError('Freight amount must be a positive number', 400);
        const insuranceAmount = shipment.insurance ? 50 : 0;
        const taxableAmount = Number((freightAmount + insuranceAmount).toFixed(2));
        const isInterState = shipment.pickupAddress.state !== shipment.deliveryAddress.state;
        const igst = isInterState ? Number((taxableAmount * 0.05).toFixed(2)) : 0;
        const cgst = isInterState ? 0 : Number((taxableAmount * 0.025).toFixed(2));
        const sgst = isInterState ? 0 : Number((taxableAmount * 0.025).toFixed(2));
        const sequence = randomUUID().replace(/-/g, '').slice(0, 10).toUpperCase();

        return Invoice.create({
            invoiceNumber: `DL-${new Date().getFullYear()}-${sequence}`,
            shipment: shipment._id,
            customer: shipment.customer,
            generatedBy: adminId,
            freightAmount,
            insuranceAmount,
            taxableAmount,
            cgst,
            sgst,
            igst,
            totalAmount: Number((taxableAmount + cgst + sgst + igst).toFixed(2)),
            dueDate: payload.dueDate,
            notes: payload.notes,
        });
    }

    async listForUser(userId, role, page = 1, limit = 20) {
        const filter = role === roles.CUSTOMER ? { customer: userId } : {};
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            Invoice.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
                .populate('shipment', 'pickupAddress deliveryAddress status')
                .populate('customer', 'firstName lastName email'),
            Invoice.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }

    async getById(invoiceId, userId, role) {
        const invoice = await Invoice.findById(invoiceId)
            .populate('shipment', 'pickupAddress deliveryAddress status vehicleType weight')
            .populate('customer', 'firstName lastName email');
        if (!invoice) throw new AppError('Invoice not found', 404);
        if (role === roles.CUSTOMER && invoice.customer._id.toString() !== userId) {
            throw new AppError('You are not authorized to view this invoice', 403);
        }
        return invoice;
    }

    async markPaid(invoiceId) {
        const invoice = await Invoice.findById(invoiceId);
        if (!invoice) throw new AppError('Invoice not found', 404);
        if (invoice.status === 'VOID') throw new AppError('A void invoice cannot be paid', 400);
        invoice.status = 'PAID';
        await invoice.save();
        return invoice;
    }
}
module.exports = new InvoiceService();
