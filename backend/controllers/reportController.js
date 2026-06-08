const PromotionVehicle = require('../models/PromotionVehicle');
const Customer = require('../models/Customer');
const Promotion = require('../models/Promotion');
const Vehicle = require('../models/Vehicle');

exports.generateReport = async (req, res) => {
  try {
    const { customerId, promotionId, vehicleId } = req.query;
    let filter = {};

    if (promotionId) {
      filter.promotion = promotionId;
    }

    if (vehicleId) {
      filter.vehicle = vehicleId;
    }

    const promotionVehicles = await PromotionVehicle.find(filter)
      .populate('promotion')
      .populate('vehicle');

    // Build report with customer information
    const report = await Promise.all(
      promotionVehicles.map(async (pv) => {
        let customer = null;
        if (customerId) {
          customer = await Customer.findById(customerId);
        }

        return {
          customerName: customer ? `${customer.firstName} ${customer.lastName}` : 'N/A',
          vehicleBrand: pv.vehicle?.brand || 'N/A',
          vehicleModel: pv.vehicle?.model || 'N/A',
          promotionTitle: pv.promotion?.title || 'N/A',
          discountValue: pv.promotion?.discountValue || 'N/A',
          discountType: pv.promotion?.discountType || 'N/A',
          performance: pv.performance || 'Pending',
          createdAt: pv.createdAt,
        };
      })
    );

    res.json({
      message: 'Report generated successfully',
      data: report,
      total: report.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate report', error: error.message });
  }
};

exports.getDetailedReport = async (req, res) => {
  try {
    // Get all promotion-vehicle links with populated data
    const promotionVehicles = await PromotionVehicle.find()
      .populate('promotion')
      .populate('vehicle');

    // Get all customers
    const customers = await Customer.find();
    const promotions = await Promotion.find();
    const vehicles = await Vehicle.find();

    const report = {
      totalPromotions: promotions.length,
      totalVehicles: vehicles.length,
      totalCustomers: customers.length,
      totalLinks: promotionVehicles.length,
      promotionVehicleDetails: promotionVehicles.map((pv) => ({
        promotionTitle: pv.promotion?.title,
        vehicleBrand: pv.vehicle?.brand,
        vehicleModel: pv.vehicle?.model,
        vehiclePlate: pv.vehicle?.plateNumber,
        discountValue: pv.promotion?.discountValue,
        discountType: pv.promotion?.discountType,
        performance: pv.performance,
      })),
      activePromotions: promotions.filter((p) => p.status === 'Active').length,
      activeVehicles: vehicles.filter((v) => v.status === 'Active').length,
      activeCustomers: customers.filter((c) => c.status === 'Active').length,
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate detailed report', error: error.message });
  }
};
