const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { verifyToken, authorize } = require('../middleware/auth');

router.post('/', verifyToken, customerController.createCustomer);
router.get('/', verifyToken, customerController.getCustomers);
router.get('/:id', verifyToken, customerController.getCustomerById);
router.put('/:id', verifyToken, customerController.updateCustomer);
router.delete('/:id', verifyToken, authorize(['admin', 'manager']), customerController.deleteCustomer);

module.exports = router;
