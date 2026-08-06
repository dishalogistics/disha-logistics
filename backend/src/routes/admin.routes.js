const router = require("express").Router();
const AdminController = require("../controllers/admin.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const roles = require("../constants/roles");

// All routes require authentication and ADMIN or SUPER_ADMIN role
router.use(authenticate);
router.use(authorize(roles.ADMIN, roles.SUPER_ADMIN));

// User management
router.get("/users", AdminController.getUsers);
router.get("/users/:id", AdminController.getUserById);
router.patch("/users/:id", AdminController.updateUser);
router.delete("/users/:id", AdminController.deleteUser);

// Shipment management
router.get("/shipments", AdminController.getShipments);

// Analytics
router.get("/analytics", AdminController.getAnalytics);

module.exports = router;
