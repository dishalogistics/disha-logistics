const ShipmentRepository = require("../repositories/shipment.repository");
const UserRepository = require("../repositories/user.repository");
const AppError = require("../utils/AppError");
const shipmentStatus = require("../constants/shipmentStatus");

class MarketplaceService {
    // Get available shipments for transporters (pending/confirmed without transporter)
    async getAvailableShipments(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const query = {
            status: { $in: [shipmentStatus.PENDING, shipmentStatus.CONFIRMED] },
            transporter: null, // no transporter assigned
            ...filters,
        };
        // Add optional filters: pickup city, delivery city, goods type, vehicle type, etc.
        if (filters.pickupCity) query["pickupAddress.city"] = filters.pickupCity;
        if (filters.deliveryCity)
            query["deliveryAddress.city"] = filters.deliveryCity;
        if (filters.goodsType) query.goodsType = filters.goodsType;
        if (filters.vehicleType) query.vehicleType = filters.vehicleType;

        const [data, total] = await Promise.all([
            ShipmentRepository.model
                .find(query)
                .sort({ createdAt: 1 })
                .skip(skip)
                .limit(limit)
                .populate("customer", "firstName lastName email phoneNumber"),
            ShipmentRepository.model.countDocuments(query),
        ]);
        return { data, total, page, limit };
    }

    // Transporter accepts a load (assigns themselves)
    async acceptLoad(shipmentId, transporterId) {
        const shipment = await ShipmentRepository.findById(shipmentId);
        if (!shipment) throw new AppError("Shipment not found", 404);
        if (shipment.transporter)
            throw new AppError("Shipment already assigned", 400);
        if (
            ![shipmentStatus.PENDING, shipmentStatus.CONFIRMED].includes(
                shipment.status,
            )
        ) {
            throw new AppError("Shipment not available for acceptance", 400);
        }

        const transporter = await UserRepository.findById(transporterId);
        if (!transporter || transporter.role !== "TRANSPORTER") {
            throw new AppError("Invalid transporter", 400);
        }

        shipment.transporter = transporterId;
        shipment.status = shipmentStatus.ASSIGNED;
        shipment.statusHistory.push({
            status: shipmentStatus.ASSIGNED,
            timestamp: new Date(),
            note: `Accepted by transporter ${transporter.firstName} ${transporter.lastName}`,
        });
        await shipment.save();
        return shipment;
    }

    // Transporter rejects a load (just for logging, no action required)
    async rejectLoad(shipmentId, transporterId, reason = "") {
        // Optionally we could log the rejection, but we just return success
        // For now, just check existence
        const shipment = await ShipmentRepository.findById(shipmentId);
        if (!shipment) throw new AppError("Shipment not found", 404);
        // We could record the rejection in a separate collection, but we'll skip
        return { success: true };
    }
}

module.exports = new MarketplaceService();
