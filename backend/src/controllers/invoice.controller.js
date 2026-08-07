const InvoiceService = require('../services/invoice.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
    const invoice = await InvoiceService.createForShipment(req.params.shipmentId, req.user.id, req.body);
    ApiResponse.success(res, 'Invoice generated', invoice, 201);
});
exports.list = asyncHandler(async (req, res) => {
    const result = await InvoiceService.listForUser(req.user.id, req.user.role, Number(req.query.page || 1), Number(req.query.limit || 20));
    ApiResponse.success(res, 'Invoices retrieved', result);
});
exports.getById = asyncHandler(async (req, res) => {
    const invoice = await InvoiceService.getById(req.params.id, req.user.id, req.user.role);
    ApiResponse.success(res, 'Invoice retrieved', invoice);
});
exports.markPaid = asyncHandler(async (req, res) => {
    const invoice = await InvoiceService.markPaid(req.params.id);
    ApiResponse.success(res, 'Invoice marked as paid', invoice);
});
