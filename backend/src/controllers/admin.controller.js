const AdminService = require("../services/admin.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.getUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, role, isActive, search } = req.query;
    const filters = { role, isActive, search };
    Object.keys(filters).forEach(
        (key) => filters[key] === undefined && delete filters[key],
    );
    const result = await AdminService.getUsers(
        parseInt(page),
        parseInt(limit),
        filters,
    );
    ApiResponse.success(res, "Users retrieved", result);
});

exports.getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await AdminService.getUserById(id);
    ApiResponse.success(res, "User details", user);
});

exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const updated = await AdminService.updateUser(id, updateData);
    ApiResponse.success(res, "User updated", updated);
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await AdminService.deleteUser(id);
    ApiResponse.success(res, "User deactivated", user);
});

exports.getShipments = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        status,
        customerId,
        transporterId,
        fromDate,
        toDate,
    } = req.query;
    const filters = { status, customerId, transporterId, fromDate, toDate };
    Object.keys(filters).forEach(
        (key) => filters[key] === undefined && delete filters[key],
    );
    const result = await AdminService.getShipments(
        parseInt(page),
        parseInt(limit),
        filters,
    );
    ApiResponse.success(res, "Shipments retrieved", result);
});

exports.getAnalytics = asyncHandler(async (req, res) => {
    const analytics = await AdminService.getAnalytics();
    ApiResponse.success(res, "Analytics data", analytics);
});
