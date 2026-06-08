const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
  try {
    const { plateNumber, brand, model, year, vehicleType, purchasePrice } = req.body;

    const vehicle = new Vehicle({
      plateNumber,
      brand,
      model,
      year,
      vehicleType,
      purchasePrice,
      registeredBy: req.user.id,
    });

    await vehicle.save();
    res.status(201).json({ message: 'Vehicle created successfully', data: vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create vehicle', error: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const { search, status } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { plateNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const vehicles = await Vehicle.find(filter)
      .populate('registeredBy', 'userName')
      .sort({ createdAt: -1 });

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch vehicles', error: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('registeredBy', 'userName');

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch vehicle', error: error.message });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('registeredBy', 'userName');

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle updated successfully', data: vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update vehicle', error: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete vehicle', error: error.message });
  }
};
