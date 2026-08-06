const MarketplaceService = require("../services/marketplace.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.getAvailableShipments = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        pickupCity,
        deliveryCity,
        goodsType,
        vehicleType,
    } = req.query;
    const filters = { pickupCity, deliveryCity, goodsType, vehicleType };
    // Remove undefined filters
    Object.keys(filters).forEach(
        (key) => filters[key] === undefined && delete filters[key],
    );
    const result = await MarketplaceService.getAvailableShipments(
        parseInt(page),
        parseInt(limit),
        filters,
    );
    ApiResponse.success(res, "Available shipments retrieved", result);
});

exports.acceptLoad = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const transporterId = req.user.id;
    const shipment = await MarketplaceService.acceptLoad(id, transporterId);
    ApiResponse.success(res, "Load accepted successfully", shipment);
});

exports.rejectLoad = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const transporterId = req.user.id;
    const { reason } = req.body;
    const result = await MarketplaceService.rejectLoad(id, transporterId, reason);
    ApiResponse.success(res, "Load rejected", result);
});
