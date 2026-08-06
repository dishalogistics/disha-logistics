const UserRepository = require("../repositories/user.repository");
const ShipmentRepository = require("../repositories/shipment.repository");
const AppError = require("../utils/AppError");
const roles = require("../constants/roles");
const shipmentStatus = require("../constants/shipmentStatus");

class AdminService {
    // Get all users with pagination and filters
    async getUsers(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const query = {};
        if (filters.role) query.role = filters.role;
        if (filters.isActive !== undefined) query.isActive = filters.isActive;
        if (filters.search) {
            query.$or = [
                { firstName: { $regex: filters.search, $options: "i" } },
                { lastName: { $regex: filters.search, $options: "i" } },
                { email: { $regex: filters.search, $options: "i" } },
            ];
        }
        const [data, total] = await Promise.all([
            UserRepository.model
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .select("-password"),
            UserRepository.model.countDocuments(query),
        ]);
        return { data, total, page, limit };
    }

    // Get user by ID (admin view)
    async getUserById(userId) {
        const user = await UserRepository.findById(userId);
        if (!user) throw new AppError("User not found", 404);
        return user;
    }

    // Update user (admin) – e.g., activate/deactivate, change role
    async updateUser(userId, updateData) {
        const user = await UserRepository.findById(userId);
        if (!user) throw new AppError("User not found", 404);
        // Prevent changing own role/status to avoid locking yourself out (optional)
        // We'll allow but be careful
        if (updateData.role && !Object.values(roles).includes(updateData.role)) {
            throw new AppError("Invalid role", 400);
        }
        // if (updateData.isActive !== undefined) user.isActive = updateData.isActive;
        // we can also update other fields
        const updated = await UserRepository.update(userId, updateData);
        return updated;
    }

    // Delete user (soft delete by deactivating, or hard delete)
    async deleteUser(userId) {
        // For safety, we'll deactivate instead of hard delete
        const user = await UserRepository.update(userId, { isActive: false });
        return user;
    }

    // Get all shipments with filters (admin)
    async getShipments(page = 1, limit = 10, filters = {}) {
        const skip = (page - 1) * limit;
        const query = {};
        if (filters.status) query.status = filters.status;
        if (filters.customerId) query.customer = filters.customerId;
        if (filters.transporterId) query.transporter = filters.transporterId;
        if (filters.fromDate) {
            query.createdAt = { $gte: new Date(filters.fromDate) };
        }
        if (filters.toDate) {
            query.createdAt = { ...query.createdAt, $lte: new Date(filters.toDate) };
        }
        const [data, total] = await Promise.all([
            ShipmentRepository.model
                .find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("customer", "firstName lastName email")
                .populate("transporter", "firstName lastName email")
                .populate("driver", "firstName lastName email"),
            ShipmentRepository.model.countDocuments(query),
        ]);
        return { data, total, page, limit };
    }

    // Get platform analytics
    async getAnalytics() {
        const totalUsers = await UserRepository.count();
        const totalCustomers = await UserRepository.count({ role: roles.CUSTOMER });
        const totalTransporters = await UserRepository.count({
            role: roles.TRANSPORTER,
        });
        const totalDrivers = await UserRepository.count({ role: roles.DRIVER });
        const totalShipments = await ShipmentRepository.count();
        const totalDelivered = await ShipmentRepository.count({
            status: shipmentStatus.DELIVERED,
        });
        const totalPending = await ShipmentRepository.count({
            status: shipmentStatus.PENDING,
        });
        const totalInTransit = await ShipmentRepository.count({
            status: {
                $in: [
                    shipmentStatus.ASSIGNED,
                    shipmentStatus.PICKUP_SCHEDULED,
                    shipmentStatus.PICKED_UP,
                    shipmentStatus.IN_TRANSIT,
                    shipmentStatus.REACHED_HUB,
                    shipmentStatus.OUT_FOR_DELIVERY,
                ],
            },
        });
        const totalRevenue = await ShipmentRepository.model.aggregate([
            { $match: { paymentStatus: "Paid" } },
            { $group: { _id: null, total: { $sum: "$finalPrice" } } },
        ]);
        const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

        // Recent shipments (last 5)
        const recentShipments = await ShipmentRepository.model
            .find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("customer", "firstName lastName email");

        return {
            users: {
                total: totalUsers,
                customers: totalCustomers,
                transporters: totalTransporters,
                drivers: totalDrivers,
            },
            shipments: {
                total: totalShipments,
                delivered: totalDelivered,
                pending: totalPending,
                inTransit: totalInTransit,
            },
            revenue,
            recentShipments,
        };
    }
    
}

module.exports = new AdminService();
