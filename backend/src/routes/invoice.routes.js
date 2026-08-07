const router = require('express').Router();
const { body, param, query } = require('express-validator');
const InvoiceController = require('../controllers/invoice.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const { validate } = require('../middlewares/validate.middleware');
const roles = require('../constants/roles');

router.use(authenticate);
router.use(authorize(roles.CUSTOMER, roles.ADMIN, roles.SUPER_ADMIN));
router.get('/', [query('page').optional().isInt({ min: 1 }), query('limit').optional().isInt({ min: 1, max: 100 }), validate], InvoiceController.list);
router.get('/:id', [param('id').isMongoId(), validate], InvoiceController.getById);
router.post('/shipment/:shipmentId', authorize(roles.ADMIN, roles.SUPER_ADMIN), [param('shipmentId').isMongoId(), body('freightAmount').optional().isFloat({ min: 0 }), body('dueDate').optional().isISO8601(), body('notes').optional().isString().isLength({ max: 500 }), validate], InvoiceController.create);
router.patch('/:id/mark-paid', authorize(roles.ADMIN, roles.SUPER_ADMIN), [param('id').isMongoId(), validate], InvoiceController.markPaid);
module.exports = router;
