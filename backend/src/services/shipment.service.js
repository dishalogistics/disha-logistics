const ShipmentRepository = require('../repositories/shipment.repository');
const UserRepository = require('../repositories/user.repository');
const AppError = require('../utils/AppError');
const shipmentStatus = require('../constants/shipmentStatus');
const roles = require('../constants/roles');

class ShipmentService {
    // Calculate price based on weight, distance, vehicle type, speed
    calculatePrice(weight, vehicleType, deliverySpeed, distance = 100) {
        // Base rate per kg per km (mock)
        const rates = {
            'Mini Truck': 8,
            '14FT': 10,
            '17FT': 12,
            'Container': 15,
            'Trailer': 18,
        };
        const speedMultiplier = {
            Standard: 1,
            Express: 1.5,
            'Same Day': 2.5,
        };
        const baseRate = rates[vehicleType] || 10;
        const weightFactor = weight > 1000 ? 0.8 : 1; // discount for heavy
        const price = baseRate * distance * weightFactor * speedMultiplier[deliverySpeed];
        return Math.round(price);
    }

    async createBooking(customerId, data) {
        // Validate customer exists
        const customer = await UserRepository.findById(customerId);
        if (!customer) throw new AppError('Customer not found', 404);

        // Calculate distance (mock – replace with Google Maps later)
        const distance = 100; // placeholder

        // Calculate price
        const { weight, vehicleType, deliverySpeed, insurance, couponCode } = data;
        let basePrice = this.calculatePrice(weight, vehicleType, deliverySpeed, distance);
        let discount = 0;
        // Apply coupon logic (placeholder)
        if (couponCode === 'DISHA10') {
            discount = basePrice * 0.1;
        }
        let finalPrice = basePrice - discount;
        if (insurance) {
            finalPrice += 50; // flat insurance fee
        }

        const shipmentData = {
            customer: customerId,
            pickupAddress: data.pickupAddress,
            deliveryAddress: data.deliveryAddress,
            goodsType: data.goodsType,
            weight: data.weight,
            dimensions: data.dimensions || {},
            vehicleType,
            deliverySpeed: deliverySpeed || 'Standard',
            insurance: insurance || false,
            couponCode: couponCode || '',
            notes: data.notes || '',
            basePrice,
            discount,
            finalPrice,
            status: shipmentStatus.PENDING,
            statusHistory: [{ status: shipmentStatus.PENDING, timestamp: new Date(), note: 'Booking created' }],
        };

        const shipment = await ShipmentRepository.create(shipmentData);
        return shipment;
    }

    async getShipmentsForCustomer(customerId, page, limit) {
        return ShipmentRepository.findByCustomer(customerId, page, limit);
    }

    async getShipmentsForTransporter(transporterId, page, limit) {
        return ShipmentRepository.findByTransporter(transporterId, page, limit);
    }

    async getShipmentById(id, userId, userRole) {
        const shipment = await ShipmentRepository.findById(id);
        if (!shipment) throw new AppError('Shipment not found', 404);

        // Check permissions: customer sees own, transporter sees assigned, admin sees all
        if (userRole === roles.CUSTOMER && shipment.customer.toString() !== userId) {
            throw new AppError('You are not authorized to view this shipment', 403);
        }
        if (userRole === roles.TRANSPORTER && shipment.transporter?.toString() !== userId) {
            throw new AppError('You are not authorized to view this shipment', 403);
        }
        if (userRole === roles.DRIVER && shipment.driver?.toString() !== userId) {
            throw new AppError('You are not authorized to view this shipment', 403);
        }

        return shipment;
    }

    async updateShipmentStatus(id, status, note, userId, userRole) {
        const shipment = await ShipmentRepository.findById(id);
        if (!shipment) throw new AppError('Shipment not found', 404);

        // Authorization: only admin, assigned transporter, or assigned driver can update
        const isAuthorized =
            userRole === roles.ADMIN ||
            userRole === roles.SUPER_ADMIN ||
            (userRole === roles.TRANSPORTER && shipment.transporter?.toString() === userId) ||
            (userRole === roles.DRIVER && shipment.driver?.toString() === userId);

        if (!isAuthorized) {
            throw new AppError('You are not authorized to update this shipment', 403);
        }

        // Validate status transition (optional – you can define allowed transitions)
        const validStatuses = Object.values(shipmentStatus);
        if (!validStatuses.includes(status)) {
            throw new AppError('Invalid status', 400);
        }

        // If status is DELIVERED, set deliveredAt
        if (status === shipmentStatus.DELIVERED) {
            shipment.deliveredAt = new Date();
        }
        if (status === shipmentStatus.CANCELLED) {
            shipment.cancelledAt = new Date();
        }

        const updated = await ShipmentRepository.updateStatus(id, status, note);
        return updated;
    }

    async assignTransporter(id, transporterId, userId, userRole) {
        if (userRole !== roles.ADMIN && userRole !== roles.SUPER_ADMIN) {
            throw new AppError('Only admin can assign transporter', 403);
        }

        const shipment = await ShipmentRepository.findById(id);
        if (!shipment) throw new AppError('Shipment not found', 404);

        const transporter = await UserRepository.findById(transporterId);
        if (!transporter || transporter.role !== roles.TRANSPORTER) {
            throw new AppError('Invalid transporter', 400);
        }

        shipment.transporter = transporterId;
        // Also update status to ASSIGNED if currently PENDING or CONFIRMED
        if (shipment.status === shipmentStatus.PENDING || shipment.status === shipmentStatus.CONFIRMED) {
            shipment.status = shipmentStatus.ASSIGNED;
            shipment.statusHistory.push({ status: shipmentStatus.ASSIGNED, timestamp: new Date(), note: 'Transporter assigned' });
        }
        await shipment.save();
        return shipment;
    }

    async assignDriver(id, driverId, userId, userRole) {
        if (userRole !== roles.ADMIN && userRole !== roles.SUPER_ADMIN && userRole !== roles.TRANSPORTER) {
            throw new AppError('Only admin or transporter can assign driver', 403);
        }

        const shipment = await ShipmentRepository.findById(id);
        if (!shipment) throw new AppError('Shipment not found', 404);

        // If transporter is assigning, they must be assigned to this shipment
        if (userRole === roles.TRANSPORTER && shipment.transporter?.toString() !== userId) {
            throw new AppError('You are not assigned to this shipment', 403);
        }

        const driver = await UserRepository.findById(driverId);
        if (!driver || driver.role !== roles.DRIVER) {
            throw new AppError('Invalid driver', 400);
        }

        shipment.driver = driverId;
        // Update status to PICKUP_SCHEDULED if appropriate
        if (shipment.status === shipmentStatus.ASSIGNED) {
            shipment.status = shipmentStatus.PICKUP_SCHEDULED;
            shipment.statusHistory.push({ status: shipmentStatus.PICKUP_SCHEDULED, timestamp: new Date(), note: 'Driver assigned' });
        }
        await shipment.save();
        return shipment;
    }

    async getShipmentStats(userId, userRole) {
        let filter = {};
        if (userRole === roles.CUSTOMER) filter = { customer: userId };
        else if (userRole === roles.TRANSPORTER) filter = { transporter: userId };
        else if (userRole === roles.DRIVER) filter = { driver: userId };
        // Admin gets all

        const total = await ShipmentRepository.count(filter);
        const statusCounts = {};
        const statuses = Object.values(shipmentStatus);
        for (const status of statuses) {
            statusCounts[status] = await ShipmentRepository.count({ ...filter, status });
        }

        return { total, statusCounts };
    }
}

module.exports = new ShipmentService();