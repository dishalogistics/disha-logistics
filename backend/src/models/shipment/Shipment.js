const mongoose = require('mongoose');
const shipmentStatus = require('../../constants/shipmentStatus');

const shipmentSchema = new mongoose.Schema(
    {
        // Customer who booked
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        // Transporter assigned (if any)
        transporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true,
        },
        // Driver assigned (if any)
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            index: true,
        },
        // Addresses
        pickupAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
            country: { type: String, default: 'India' },
            coordinates: {
                lat: Number,
                lng: Number,
            },
        },
        deliveryAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
            country: { type: String, default: 'India' },
            coordinates: {
                lat: Number,
                lng: Number,
            },
        },
        // Goods details
        goodsType: {
            type: String,
            required: true,
            enum: ['Electronics', 'Furniture', 'Food', 'Clothing', 'Documents', 'Other'],
        },
        weight: {
            type: Number,
            required: true,
            min: 0,
        },
        dimensions: {
            length: { type: Number, default: 0 },
            width: { type: Number, default: 0 },
            height: { type: Number, default: 0 },
            unit: { type: String, enum: ['cm', 'in'], default: 'cm' },
        },
        // Logistics preferences
        vehicleType: {
            type: String,
            enum: ['Mini Truck', '14FT', '17FT', 'Container', 'Trailer'],
            required: true,
        },
        deliverySpeed: {
            type: String,
            enum: ['Standard', 'Express', 'Same Day'],
            default: 'Standard',
        },
        insurance: {
            type: Boolean,
            default: false,
        },
        couponCode: {
            type: String,
            trim: true,
        },
        notes: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        // Pricing
        basePrice: {
            type: Number,
            required: true,
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
            min: 0,
        },
        finalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed'],
            default: 'Pending',
        },
        paymentId: {
            type: String,
            trim: true,
        },
        // Tracking
        status: {
            type: String,
            enum: Object.values(shipmentStatus),
            default: shipmentStatus.PENDING,
            index: true,
        },
        statusHistory: [
            {
                status: {
                    type: String,
                    enum: Object.values(shipmentStatus),
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
                note: String,
            },
        ],
        // E-POD (Proof of Delivery)
        pod: {
            signature: { type: String }, // URL or base64
            image: { type: String }, // URL
            deliveredAt: Date,
            receivedBy: String,
        },
        // Tracking info (real-time)
        currentLocation: {
            lat: Number,
            lng: Number,
            updatedAt: Date,
        },
        // Timestamps
        pickupScheduledAt: Date,
        pickedUpAt: Date,
        deliveredAt: Date,
        cancelledAt: Date,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Indexes for performance
shipmentSchema.index({ customer: 1, createdAt: -1 });
shipmentSchema.index({ transporter: 1, status: 1 });
shipmentSchema.index({ status: 1, createdAt: -1 });
shipmentSchema.index({ 'pickupAddress.pincode': 1 });
shipmentSchema.index({ 'deliveryAddress.pincode': 1 });

// Pre-save hook to add status history
shipmentSchema.pre('save', function (next) {
    if (this.isModified('status')) {
        this.statusHistory.push({
            status: this.status,
            timestamp: new Date(),
            note: `Status changed to ${this.status}`,
        });
    }
    next();
});

module.exports = mongoose.model('Shipment', shipmentSchema);