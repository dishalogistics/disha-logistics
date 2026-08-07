const router = require('express').Router();
const authRoutes = require('./auth.routes');
const shipmentRoutes = require('./shipment.routes');
const marketplaceRoutes = require('./marketplace.routes');
const adminRoutes = require('./admin.routes');
const invoiceRoutes = require('./invoice.routes');

router.use('/auth', authRoutes);
router.use('/shipments', shipmentRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/admin', adminRoutes);
router.use('/invoices', invoiceRoutes);

router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Disha Logistics API Running',
        version: 'v1',
        uptime: process.uptime(),
    });
});

module.exports = router;
