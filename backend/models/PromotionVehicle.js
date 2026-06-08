const mongoose = require('mongoose');

const promotionVehicleSchema = new mongoose.Schema(
  {
    promotion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Promotion',
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: true,
    },
    performance: {
      type: String,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

// Ensure unique promotion-vehicle combination
promotionVehicleSchema.index({ promotion: 1, vehicle: 1 }, { unique: true });

module.exports = mongoose.model('PromotionVehicle', promotionVehicleSchema);
