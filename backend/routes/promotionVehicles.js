const express = require('express');
const router = express.Router();
const promotionVehicleController = require('../controllers/promotionVehicleController');
const { verifyToken, authorize } = require('../middleware/auth');

router.post('/', verifyToken, authorize(['admin', 'manager']), promotionVehicleController.createPromotionVehicle);
router.get('/', verifyToken, promotionVehicleController.getPromotionVehicles);
router.get('/:id', verifyToken, promotionVehicleController.getPromotionVehicleById);
router.put('/:id', verifyToken, authorize(['admin', 'manager']), promotionVehicleController.updatePromotionVehicle);
router.delete('/:id', verifyToken, authorize(['admin', 'manager']), promotionVehicleController.deletePromotionVehicle);

module.exports = router;
