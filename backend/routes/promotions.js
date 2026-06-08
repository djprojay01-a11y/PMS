const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const { verifyToken, authorize } = require('../middleware/auth');

router.post('/', verifyToken, authorize(['admin', 'manager']), promotionController.createPromotion);
router.get('/', verifyToken, promotionController.getPromotions);
router.get('/:id', verifyToken, promotionController.getPromotionById);
router.put('/:id', verifyToken, authorize(['admin', 'manager']), promotionController.updatePromotion);
router.delete('/:id', verifyToken, authorize(['admin', 'manager']), promotionController.deletePromotion);

module.exports = router;
