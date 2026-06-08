const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { verifyToken, authorize } = require('../middleware/auth');

router.post('/', verifyToken, vehicleController.createVehicle);
router.get('/', verifyToken, vehicleController.getVehicles);
router.get('/:id', verifyToken, vehicleController.getVehicleById);
router.put('/:id', verifyToken, vehicleController.updateVehicle);
router.delete('/:id', verifyToken, authorize(['admin', 'manager']), vehicleController.deleteVehicle);

module.exports = router;
