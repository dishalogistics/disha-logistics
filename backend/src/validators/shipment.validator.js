const { body, param, query } = require("express-validator");
const { validate } = require("../middlewares/validate.middleware");

const addressValidation = (prefix) => ({
    street: body(`${prefix}.street`)
        .notEmpty()
        .withMessage("Street is required"),
    city: body(`${prefix}.city`).notEmpty().withMessage("City is required"),
    state: body(`${prefix}.state`)
        .notEmpty()
        .withMessage("State is required"),
    pincode: body(`${prefix}.pincode`)
        .matches(/^\d{6}$/)
        .withMessage("Pincode must be 6 digits"),
});

const createBookingValidation = [
    body("pickupAddress").isObject().withMessage("Pickup address required"),
    body("deliveryAddress").isObject().withMessage("Delivery address required"),
    ...Object.values(addressValidation("pickupAddress")),
    ...Object.values(addressValidation("deliveryAddress")),
    body("goodsType").notEmpty().withMessage("Goods type required"),
    body("weight")
        .isNumeric({ min: 0.1 })
        .withMessage("Weight must be positive number"),
    body("vehicleType")
        .isIn(["Mini Truck", "14FT", "17FT", "Container", "Trailer"])
        .withMessage("Invalid vehicle type"),
    body("deliverySpeed").optional().isIn(["Standard", "Express", "Same Day"]),
    body("insurance").optional().isBoolean(),
    body("couponCode").optional().isString(),
    body("notes").optional().isString().isLength({ max: 500 }),
    validate,
];

const statusUpdateValidation = [
    param("id").isMongoId().withMessage("Invalid shipment ID"),
    body("status")
        .isIn([
            "PENDING",
            "CONFIRMED",
            "ASSIGNED",
            "PICKUP_SCHEDULED",
            "PICKED_UP",
            "IN_TRANSIT",
            "REACHED_HUB",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED",
        ])
        .withMessage("Invalid status"),
    body("note").optional().isString().isLength({ max: 200 }),
    validate,
];

const assignValidation = [
    param("id").isMongoId().withMessage("Invalid shipment ID"),
    body("transporterId")
        .optional()
        .isMongoId()
        .withMessage("Invalid transporter ID"),
    body("driverId").optional().isMongoId().withMessage("Invalid driver ID"),
    validate,
];

const paginationValidation = [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
    validate,
];

module.exports = {
    createBookingValidation,
    statusUpdateValidation,
    assignValidation,
    paginationValidation,
};
