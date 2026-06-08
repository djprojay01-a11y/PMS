const Promotion = require('../models/Promotion');

exports.createPromotion = async (req, res) => {
  try {
    const { title, description, discountType, discountValue, startDate, endDate } = req.body;

    const promotion = new Promotion({
      title,
      description,
      discountType,
      discountValue,
      startDate,
      endDate,
      createdBy: req.user.id,
    });

    await promotion.save();
    res.status(201).json({ message: 'Promotion created successfully', data: promotion });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create promotion', error: error.message });
  }
};

exports.getPromotions = async (req, res) => {
  try {
    const { search, status } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const promotions = await Promotion.find(filter)
      .populate('createdBy', 'userName')
      .sort({ createdAt: -1 });

    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch promotions', error: error.message });
  }
};

exports.getPromotionById = async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate('createdBy', 'userName');

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch promotion', error: error.message });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('createdBy', 'userName');

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    res.json({ message: 'Promotion updated successfully', data: promotion });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update promotion', error: error.message });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);

    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }

    res.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete promotion', error: error.message });
  }
};
