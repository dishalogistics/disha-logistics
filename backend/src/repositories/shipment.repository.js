const Shipment = require('../models/shipment/Shipment');
const BaseRepository = require('./base.repository');

class ShipmentRepository extends BaseRepository {
    constructor() {
        super(Shipment);
    }

    async findByCustomer(customerId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.model.find({ customer: customerId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('transporter', 'firstName lastName email')
                .populate('driver', 'firstName lastName email'),
            this.model.countDocuments({ customer: customerId }),
        ]);
        return { data, total, page, limit };
    }

    async findByTransporter(transporterId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.model.find({ transporter: transporterId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('customer', 'firstName lastName email'),
            this.model.countDocuments({ transporter: transporterId }),
        ]);
        return { data, total, page, limit };
    }

    async updateStatus(id, status, note = '') {
        const shipment = await this.model.findById(id);
        if (!shipment) return null;
        shipment.status = status;
        shipment.statusHistory.push({ status, timestamp: new Date(), note });
        return shipment.save();
    }
}

module.exports = new ShipmentRepository();