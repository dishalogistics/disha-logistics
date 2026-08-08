const mongoose = require("mongoose");
const shipmentStatus = require("../../constants/shipmentStatus");

const addressSchema = new mongoose.Schema(
    {
        street: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
        },

        pincode: {
            type: String,
            required: true,
            match: /^\d{6}$/,
        },

        country: {
            type: String,
            default: "India",
            trim: true,
        },

        coordinates: {
            lat: {
                type: Number,
            },

            lng: {
                type: Number,
            },
        },
    },
    {
        _id: false,
    }
);

const dimensionsSchema = new mongoose.Schema(
    {
        length: {
            type: Number,
            default: 0,
            min: 0,
        },

        width: {
            type: Number,
            default: 0,
            min: 0,
        },

        height: {
            type: Number,
            default: 0,
            min: 0,
        },

        unit: {
            type: String,
            enum: ["cm", "in"],
            default: "cm",
        },
    },
    {
        _id: false,
    }
);

const statusHistorySchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: Object.values(shipmentStatus),
            required: true,
        },

        timestamp: {
            type: Date,
            default: Date.now,
        },

        note: {
            type: String,
            trim: true,
            maxlength: 200,
        },
    },
    {
        _id: false,
    }
);

const shipmentSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        transporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true,
            default: null,
        },

        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true,
            default: null,
        },

        pickupAddress: {
            type: addressSchema,
            required: true,
        },

        deliveryAddress: {
            type: addressSchema,
            required: true,
        },

        goodsType: {
            type: String,
            required: true,
            enum: [
                "Electronics",
                "Furniture",
                "Food",
                "Clothing",
                "Documents",
                "Other",
            ],
            trim: true,
        },

        weight: {
            type: Number,
            required: true,
            min: 0.1,
        },

        dimensions: {
            type: dimensionsSchema,
            default: () => ({}),
        },

        vehicleType: {
            type: String,
            required: true,
            enum: [
                "Mini Truck",
                "14FT",
                "17FT",
                "Container",
                "Trailer",
            ],
        },

        deliverySpeed: {
            type: String,
            enum: [
                "Standard",
                "Express",
                "Same Day",
            ],
            default: "Standard",
        },

        insurance: {
            type: Boolean,
            default: false,
        },

        couponCode: {
            type: String,
            trim: true,
            default: "",
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

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
            enum: [
                "Pending",
                "Paid",
                "Failed",
            ],
            default: "Pending",
        },

        paymentId: {
            type: String,
            trim: true,
            default: null,
        },

        status: {
            type: String,
            enum: Object.values(shipmentStatus),
            default: shipmentStatus.PENDING,
            index: true,
        },

        statusHistory: {
            type: [statusHistorySchema],
            default: [],
        },

        pod: {
            signature: {
                type: String,
            },

            image: {
                type: String,
            },

            deliveredAt: {
                type: Date,
            },

            receivedBy: {
                type: String,
                trim: true,
            },
        },

        currentLocation: {
            lat: Number,
            lng: Number,
            updatedAt: Date,
        },

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

// Indexes
shipmentSchema.index({
    customer: 1,
    createdAt: -1,
});

shipmentSchema.index({
    transporter: 1,
    status: 1,
});

shipmentSchema.index({
    driver: 1,
    status: 1,
});

shipmentSchema.index({
    status: 1,
    createdAt: -1,
});

shipmentSchema.index({
    "pickupAddress.pincode": 1,
});

shipmentSchema.index({
    "deliveryAddress.pincode": 1,
});

// NO pre-save status hook here.

module.exports = mongoose.model(
    "Shipment",
    shipmentSchema
);