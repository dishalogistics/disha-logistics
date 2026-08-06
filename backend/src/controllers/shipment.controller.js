const ShipmentService = require("../services/shipment.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.createBooking = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const shipment = await ShipmentService.createBooking(userId, req.body);
    ApiResponse.success(res, "Shipment booked successfully", shipment, 201);
});

exports.getMyShipments = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const result = await ShipmentService.getShipmentsForCustomer(
        userId,
        parseInt(page),
        parseInt(limit),
    );
    ApiResponse.success(res, "Shipments retrieved", result);
});

exports.getTransporterShipments = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const result = await ShipmentService.getShipmentsForTransporter(
        userId,
        parseInt(page),
        parseInt(limit),
    );
    ApiResponse.success(res, "Shipments retrieved", result);
});

exports.getShipmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    const shipment = await ShipmentService.getShipmentById(id, userId, userRole);
    ApiResponse.success(res, "Shipment details", shipment);
});

exports.updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, note } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;
    const updated = await ShipmentService.updateShipmentStatus(
        id,
        status,
        note,
        userId,
        userRole,
    );
    ApiResponse.success(res, "Shipment status updated", updated);
});

exports.assignTransporter = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { transporterId } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;
    const updated = await ShipmentService.assignTransporter(
        id,
        transporterId,
        userId,
        userRole,
    );
    ApiResponse.success(res, "Transporter assigned", updated);
});

exports.assignDriver = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { driverId } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;
    const updated = await ShipmentService.assignDriver(
        id,
        driverId,
        userId,
        userRole,
    );
    ApiResponse.success(res, "Driver assigned", updated);
});

exports.getStats = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const userRole = req.user.role;
    const stats = await ShipmentService.getShipmentStats(userId, userRole);
    ApiResponse.success(res, "Shipment statistics", stats);
});
