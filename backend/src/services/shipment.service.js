const ShipmentRepository = require("../repositories/shipment.repository");
const UserRepository = require("../repositories/user.repository");
const AppError = require("../utils/AppError");
const shipmentStatus = require("../constants/shipmentStatus");
const roles = require("../constants/roles");

class ShipmentService {
    calculatePrice(
        weight,
        vehicleType,
        deliverySpeed = "Standard",
        distance = 100
    ) {
        const rates = {
            "Mini Truck": 8,
            "14FT": 10,
            "17FT": 12,
            Container: 15,
            Trailer: 18,
        };

        const speedMultiplier = {
            Standard: 1,
            Express: 1.5,
            "Same Day": 2.5,
        };

        const baseRate = rates[vehicleType];

        if (!baseRate) {
            throw new AppError("Invalid vehicle type", 400);
        }

        const multiplier = speedMultiplier[deliverySpeed];

        if (!multiplier) {
            throw new AppError("Invalid delivery speed", 400);
        }

        const numericWeight = Number(weight);

        if (!Number.isFinite(numericWeight) || numericWeight <= 0) {
            throw new AppError("Weight must be a positive number", 400);
        }

        const numericDistance = Number(distance);

        if (!Number.isFinite(numericDistance) || numericDistance <= 0) {
            throw new AppError("Invalid shipment distance", 400);
        }

        const weightFactor = numericWeight > 1000 ? 0.8 : 1;

        const price =
            baseRate *
            numericDistance *
            weightFactor *
            multiplier;

        return Math.round(price);
    }

    async createBooking(customerId, data) {
        if (!customerId) {
            throw new AppError("Customer ID is required", 401);
        }

        // Check customer
        const customer = await UserRepository.findById(customerId);

        if (!customer) {
            throw new AppError("Customer not found", 404);
        }

        const {
            pickupAddress,
            deliveryAddress,
            goodsType,
            weight,
            dimensions,
            vehicleType,
            deliverySpeed = "Standard",
            insurance = false,
            couponCode = "",
            notes = "",
        } = data;

        // ------------------------------------
        // Additional safety validation
        // ------------------------------------

        if (!pickupAddress || typeof pickupAddress !== "object") {
            throw new AppError("Pickup address is required", 400);
        }

        if (!deliveryAddress || typeof deliveryAddress !== "object") {
            throw new AppError("Delivery address is required", 400);
        }

        if (!goodsType) {
            throw new AppError("Goods type is required", 400);
        }

        if (!vehicleType) {
            throw new AppError("Vehicle type is required", 400);
        }

        // ------------------------------------
        // Distance
        // ------------------------------------

        // Temporary value.
        // Replace with Google Maps / Mapbox distance later.
        const distance = 100;

        // ------------------------------------
        // Price
        // ------------------------------------

        const basePrice = this.calculatePrice(
            weight,
            vehicleType,
            deliverySpeed,
            distance
        );

        let discount = 0;

        // Coupon
        if (couponCode?.trim().toUpperCase() === "DISHA10") {
            discount = Math.round(basePrice * 0.1);
        }

        let finalPrice = basePrice - discount;

        // Insurance
        if (insurance === true) {
            finalPrice += 50;
        }

        if (finalPrice < 0) {
            finalPrice = 0;
        }

        // ------------------------------------
        // Shipment object
        // ------------------------------------

        const shipmentData = {
            customer: customerId,

            pickupAddress: {
                street: pickupAddress.street,
                city: pickupAddress.city,
                state: pickupAddress.state,
                pincode: pickupAddress.pincode,
                country: pickupAddress.country || "India",
                ...(pickupAddress.coordinates
                    ? {
                          coordinates: {
                              lat: Number(pickupAddress.coordinates.lat),
                              lng: Number(pickupAddress.coordinates.lng),
                          },
                      }
                    : {}),
            },

            deliveryAddress: {
                street: deliveryAddress.street,
                city: deliveryAddress.city,
                state: deliveryAddress.state,
                pincode: deliveryAddress.pincode,
                country: deliveryAddress.country || "India",
                ...(deliveryAddress.coordinates
                    ? {
                          coordinates: {
                              lat: Number(deliveryAddress.coordinates.lat),
                              lng: Number(deliveryAddress.coordinates.lng),
                          },
                      }
                    : {}),
            },

            goodsType,

            weight: Number(weight),

            dimensions: {
                length: Number(dimensions?.length || 0),
                width: Number(dimensions?.width || 0),
                height: Number(dimensions?.height || 0),
                unit: dimensions?.unit || "cm",
            },

            vehicleType,

            deliverySpeed,

            insurance: Boolean(insurance),

            couponCode: couponCode?.trim() || "",

            notes: notes?.trim() || "",

            basePrice,

            discount,

            finalPrice,

            paymentStatus: "Pending",

            status: shipmentStatus.PENDING,

            statusHistory: [
                {
                    status: shipmentStatus.PENDING,
                    timestamp: new Date(),
                    note: "Booking created",
                },
            ],
        };

        // ------------------------------------
        // Debug
        // ------------------------------------

        console.log(
            "Creating shipment:",
            JSON.stringify(shipmentData, null, 2)
        );

        // ------------------------------------
        // Save
        // ------------------------------------

        const shipment = await ShipmentRepository.create(shipmentData);

        return shipment;
    }

    
async getShipments(page = 1, limit = 10, filters = {}) {
    const query = {};

    if (filters.status) {
        query.status = filters.status;
    }

    if (filters.customerId) {
        query.customer = filters.customerId;
    }

    if (filters.transporterId) {
        query.transporter = filters.transporterId;
    }

    if (filters.fromDate || filters.toDate) {
        query.createdAt = {};

        if (filters.fromDate) {
            query.createdAt.$gte = new Date(
                filters.fromDate
            );
        }

        if (filters.toDate) {
            const toDate = new Date(filters.toDate);

            // Include complete day
            toDate.setHours(23, 59, 59, 999);

            query.createdAt.$lte = toDate;
        }
    }

    return ShipmentRepository.findAll(
        query,
        page,
        limit
    );
}

    async getShipmentsForCustomer(customerId, page, limit) {
        return ShipmentRepository.findByCustomer(
            customerId,
            page,
            limit
        );
    }

    async getShipmentsForTransporter(transporterId, page, limit) {
        return ShipmentRepository.findByTransporter(
            transporterId,
            page,
            limit
        );
    }

    async getShipmentById(id, userId, userRole) {
        const shipment = await ShipmentRepository.findById(id);

        if (!shipment) {
            throw new AppError("Shipment not found", 404);
        }

        const userIdString = userId.toString();

        if (
            userRole === roles.CUSTOMER &&
            shipment.customer?.toString() !== userIdString
        ) {
            throw new AppError(
                "You are not authorized to view this shipment",
                403
            );
        }

        if (
            userRole === roles.TRANSPORTER &&
            shipment.transporter?.toString() !== userIdString
        ) {
            throw new AppError(
                "You are not authorized to view this shipment",
                403
            );
        }

        if (
            userRole === roles.DRIVER &&
            shipment.driver?.toString() !== userIdString
        ) {
            throw new AppError(
                "You are not authorized to view this shipment",
                403
            );
        }

        return shipment;
    }

    async updateShipmentStatus(
        id,
        status,
        note,
        userId,
        userRole
    ) {
        const shipment = await ShipmentRepository.findById(id);

        if (!shipment) {
            throw new AppError("Shipment not found", 404);
        }

        const userIdString = userId.toString();

        const isAuthorized =
            userRole === roles.ADMIN ||
            userRole === roles.SUPER_ADMIN ||
            (
                userRole === roles.TRANSPORTER &&
                shipment.transporter?.toString() === userIdString
            ) ||
            (
                userRole === roles.DRIVER &&
                shipment.driver?.toString() === userIdString
            );

        if (!isAuthorized) {
            throw new AppError(
                "You are not authorized to update this shipment",
                403
            );
        }

        if (!Object.values(shipmentStatus).includes(status)) {
            throw new AppError("Invalid shipment status", 400);
        }

        const updated = await ShipmentRepository.updateStatus(
            id,
            status,
            note
        );

        return updated;
    }

    async assignTransporter(
        id,
        transporterId,
        userId,
        userRole
    ) {
        if (
            userRole !== roles.ADMIN &&
            userRole !== roles.SUPER_ADMIN
        ) {
            throw new AppError(
                "Only admin can assign transporter",
                403
            );
        }

        const shipment = await ShipmentRepository.findById(id);

        if (!shipment) {
            throw new AppError("Shipment not found", 404);
        }

        const transporter =
            await UserRepository.findById(transporterId);

        if (
            !transporter ||
            transporter.role !== roles.TRANSPORTER
        ) {
            throw new AppError("Invalid transporter", 400);
        }

        shipment.transporter = transporterId;

        if (
            shipment.status === shipmentStatus.PENDING ||
            shipment.status === shipmentStatus.CONFIRMED
        ) {
            shipment.status = shipmentStatus.ASSIGNED;

            shipment.statusHistory.push({
                status: shipmentStatus.ASSIGNED,
                timestamp: new Date(),
                note: "Transporter assigned",
            });
        }

        await shipment.save();

        return shipment;
    }

    async assignDriver(
        id,
        driverId,
        userId,
        userRole
    ) {
        if (
            userRole !== roles.ADMIN &&
            userRole !== roles.SUPER_ADMIN &&
            userRole !== roles.TRANSPORTER
        ) {
            throw new AppError(
                "Only admin or transporter can assign driver",
                403
            );
        }

        const shipment = await ShipmentRepository.findById(id);

        if (!shipment) {
            throw new AppError("Shipment not found", 404);
        }

        if (
            userRole === roles.TRANSPORTER &&
            shipment.transporter?.toString() !== userId.toString()
        ) {
            throw new AppError(
                "You are not assigned to this shipment",
                403
            );
        }

        const driver = await UserRepository.findById(driverId);

        if (
            !driver ||
            driver.role !== roles.DRIVER
        ) {
            throw new AppError("Invalid driver", 400);
        }

        shipment.driver = driverId;

        if (shipment.status === shipmentStatus.ASSIGNED) {
            shipment.status = shipmentStatus.PICKUP_SCHEDULED;

            shipment.statusHistory.push({
                status: shipmentStatus.PICKUP_SCHEDULED,
                timestamp: new Date(),
                note: "Driver assigned",
            });
        }

        await shipment.save();

        return shipment;
    }

    async getShipmentStats(userId, userRole) {
        let filter = {};

        if (userRole === roles.CUSTOMER) {
            filter = { customer: userId };
        } else if (userRole === roles.TRANSPORTER) {
            filter = { transporter: userId };
        } else if (userRole === roles.DRIVER) {
            filter = { driver: userId };
        }

        const total = await ShipmentRepository.count(filter);

        const statusCounts = {};

        const statuses = Object.values(shipmentStatus);

        for (const status of statuses) {
            statusCounts[status] =
                await ShipmentRepository.count({
                    ...filter,
                    status,
                });
        }

        return {
            total,
            statusCounts,
        };
    }
}

module.exports = new ShipmentService();