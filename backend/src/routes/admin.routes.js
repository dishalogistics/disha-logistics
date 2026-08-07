const router = require("express").Router();
const AdminController = require("../controllers/admin.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const roles = require("../constants/roles");
const { body, param } = require('express-validator');
const { validate } = require('../middlewares/validate.middleware');

// All routes require authentication and ADMIN or SUPER_ADMIN role
router.use(authenticate);
router.use(authorize(roles.ADMIN, roles.SUPER_ADMIN));

// User management
router.post('/users', [
    body('firstName').trim().notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('role').isIn([roles.ADMIN, roles.CUSTOMER, roles.TRANSPORTER, roles.DRIVER]),
    body('phoneNumber').optional().matches(/^\d{10,15}$/),
    validate,
], AdminController.createUser);
router.get("/users", AdminController.getUsers);
router.get("/users/:id", [param('id').isMongoId(), validate], AdminController.getUserById);
router.patch("/users/:id", [param('id').isMongoId(), validate], AdminController.updateUser);
router.delete("/users/:id", [param('id').isMongoId(), validate], AdminController.deleteUser);

// Shipment management
router.get("/shipments", AdminController.getShipments);

// Analytics
router.get("/analytics", AdminController.getAnalytics);

module.exports = router;
