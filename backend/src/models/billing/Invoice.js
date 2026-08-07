const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true, index: true },
    shipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', required: true, unique: true, index: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    freightAmount: { type: Number, required: true, min: 0 },
    insuranceAmount: { type: Number, default: 0, min: 0 },
    taxableAmount: { type: Number, required: true, min: 0 },
    cgst: { type: Number, required: true, min: 0 },
    sgst: { type: Number, required: true, min: 0 },
    igst: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['ISSUED', 'PAID', 'VOID'], default: 'ISSUED', index: true },
    dueDate: Date,
    notes: { type: String, trim: true, maxlength: 500 },
}, { timestamps: true, versionKey: false });

invoiceSchema.index({ customer: 1, createdAt: -1 });
module.exports = mongoose.model('Invoice', invoiceSchema);
