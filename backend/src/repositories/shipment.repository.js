const Shipment = require("../models/shipment/Shipment");

class ShipmentRepository {
    async create(data) {
        try {
            const shipment = await Shipment.create(data);

            return shipment;
        } catch (error) {
            console.error("SHIPMENT CREATE ERROR:");
            console.error(error);
            console.error("MESSAGE:", error.message);
            console.error("NAME:", error.name);
            console.error("ERRORS:", error.errors);

            throw error;
        }
    }

    async findById(id) {
        return Shipment.findById(id)
            .populate("customer", "name email phone role")
            .populate("transporter", "name email phone role")
            .populate("driver", "name email phone role");
    }

    async findByCustomer(customerId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            Shipment.find({ customer: customerId })
                .populate(
                    "transporter",
                    "name email phone"
                )
                .populate(
                    "driver",
                    "name email phone"
                )
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Shipment.countDocuments({
                customer: customerId,
            }),
        ]);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findByTransporter(
        transporterId,
        page = 1,
        limit = 10
    ) {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            Shipment.find({
                transporter: transporterId,
            })
                .populate(
                    "customer",
                    "name email phone"
                )
                .populate(
                    "driver",
                    "name email phone"
                )
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Shipment.countDocuments({
                transporter: transporterId,
            }),
        ]);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findAll(filter = {}, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        Shipment.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate(
                "customer",
                "firstName lastName email phoneNumber"
            )
            .populate(
                "transporter",
                "firstName lastName email phoneNumber"
            )
            .populate(
                "driver",
                "firstName lastName email phoneNumber"
            ),

        Shipment.countDocuments(filter),
    ]);

    return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}

    async updateStatus(id, status, note) {
        const shipment = await Shipment.findById(id);

        if (!shipment) {
            return null;
        }

        shipment.status = status;

        shipment.statusHistory.push({
            status,
            timestamp: new Date(),
            note: note || `Status changed to ${status}`,
        });

        if (status === "PICKUP_SCHEDULED") {
            shipment.pickupScheduledAt = new Date();
        }

        if (status === "PICKED_UP") {
            shipment.pickedUpAt = new Date();
        }

        if (status === "DELIVERED") {
            shipment.deliveredAt = new Date();
        }

        if (status === "CANCELLED") {
            shipment.cancelledAt = new Date();
        }

        await shipment.save();

        return shipment;
    }

    async count(filter = {}) {
        return Shipment.countDocuments(filter);
    }
}

module.exports = new ShipmentRepository();