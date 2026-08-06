const router = require("express").Router();
const MarketplaceController = require("../controllers/marketplace.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const roles = require("../constants/roles");
const { param, query, body } = require("express-validator"); // added body
const { validate } = require("../middlewares/validate.middleware");

// All routes require authentication and TRANSPORTER role
router.use(authenticate);
router.use(authorize(roles.TRANSPORTER, roles.ADMIN, roles.SUPER_ADMIN));

router.get(
    "/available",
    [
        query("page").optional().isInt({ min: 1 }).toInt(),
        query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
        query("pickupCity").optional().isString(),
        query("deliveryCity").optional().isString(),
        query("goodsType").optional().isString(),
        query("vehicleType").optional().isString(),
        validate,
    ],
    MarketplaceController.getAvailableShipments,
);

router.patch(
    "/:id/accept",
    [param("id").isMongoId().withMessage("Invalid shipment ID"), validate],
    MarketplaceController.acceptLoad,
);

router.patch(
    "/:id/reject",
    [
        param("id").isMongoId().withMessage("Invalid shipment ID"),
        body("reason").optional().isString().withMessage("Reason must be string"),
        validate,
    ],
    MarketplaceController.rejectLoad,
);

module.exports = router;