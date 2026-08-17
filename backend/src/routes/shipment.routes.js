const router = require("express").Router();
const ShipmentController = require("../controllers/shipment.controller");
const {
    authenticate
} = require("../middlewares/auth.middleware");
const {
    authorize
} = require("../middlewares/role.middleware");
const roles = require("../constants/roles");
const {
    createBookingValidation,
    statusUpdateValidation,
    assignValidation,
    paginationValidation,
} = require("../validators/shipment.validator");

// All routes require authentication
router.use(authenticate);

// Customer routes
router.post(
    "/",
    authorize(roles.CUSTOMER, roles.ADMIN, roles.SUPER_ADMIN, roles.TRANSPORTER),
    createBookingValidation,
    ShipmentController.createBooking,
);
router.get(
    "/my",
    authorize(roles.CUSTOMER, roles.ADMIN, roles.SUPER_ADMIN),
    paginationValidation,
    ShipmentController.getMyShipments,
);

// Stats must be registered before the /:id route.
router.get("/stats/overview", ShipmentController.getStats);

// Transporter routes
router.get(
    "/transporter",
    authorize(roles.TRANSPORTER, roles.ADMIN, roles.SUPER_ADMIN),
    paginationValidation,
    ShipmentController.getTransporterShipments,
);

router.get(
    "/customer",
    authorize(roles.CUSTOMER, roles.ADMIN, roles.SUPER_ADMIN),
    paginationValidation,
    ShipmentController.getCustomerShipments,
);


// Common: get by ID
router.get("/:id", ShipmentController.getShipmentById);

// Status update (for admin, transporter, driver)
router.patch(
    "/:id/status",
    statusUpdateValidation,
    ShipmentController.updateStatus,
);

// Assign transporter (admin only)
router.patch(
    "/:id/assign-transporter",
    authorize(roles.ADMIN, roles.SUPER_ADMIN),
    assignValidation,
    ShipmentController.assignTransporter,
);

// Assign driver (admin or transporter)
router.patch(
    "/:id/assign-driver",
    authorize(roles.ADMIN, roles.SUPER_ADMIN, roles.TRANSPORTER),
    assignValidation,
    ShipmentController.assignDriver,
);

module.exports = router;