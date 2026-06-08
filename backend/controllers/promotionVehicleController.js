const PromotionVehicle = require('../models/PromotionVehicle');

exports.createPromotionVehicle = async (req, res) => {
  try {
    const { promotion, vehicle, performance } = req.body;

    const promotionVehicle = new PromotionVehicle({
      promotion,
      vehicle,
      performance: performance || 'Pending',
    });

    await promotionVehicle.save();
    const populated = await promotionVehicle
      .populate('promotion')
      .populate('vehicle');

    res.status(201).json({ message: 'Promotion-Vehicle link created successfully', data: populated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create promotion-vehicle link', error: error.message });
  }
};

exports.getPromotionVehicles = async (req, res) => {
  try {
    const promotionVehicles = await PromotionVehicle.find()
      .populate('promotion')
      .populate('vehicle')
      .sort({ createdAt: -1 });

    res.json(promotionVehicles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch promotion-vehicle links', error: error.message });
  }
};

exports.getPromotionVehicleById = async (req, res) => {
  try {
    const promotionVehicle = await PromotionVehicle.findById(req.params.id)
      .populate('promotion')
      .populate('vehicle');

    if (!promotionVehicle) {
      return res.status(404).json({ message: 'Promotion-Vehicle link not found' });
    }

    res.json(promotionVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch promotion-vehicle link', error: error.message });
  }
};

exports.updatePromotionVehicle = async (req, res) => {
  try {
    const promotionVehicle = await PromotionVehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('promotion')
      .populate('vehicle');

    if (!promotionVehicle) {
      return res.status(404).json({ message: 'Promotion-Vehicle link not found' });
    }

    res.json({ message: 'Promotion-Vehicle link updated successfully', data: promotionVehicle });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update promotion-vehicle link', error: error.message });
  }
};

exports.deletePromotionVehicle = async (req, res) => {
  try {
    const promotionVehicle = await PromotionVehicle.findByIdAndDelete(req.params.id);

    if (!promotionVehicle) {
      return res.status(404).json({ message: 'Promotion-Vehicle link not found' });
    }

    res.json({ message: 'Promotion-Vehicle link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete promotion-vehicle link', error: error.message });
  }
};
