const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { verifyToken, authorize } = require('../middleware/auth');

router.get('/generate', verifyToken, reportController.generateReport);
router.get('/detailed', verifyToken, authorize(['admin', 'manager']), reportController.getDetailedReport);

module.exports = router;
