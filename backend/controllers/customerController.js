const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    const customer = new Customer({
      firstName,
      lastName,
      email,
      phoneNumber,
      registeredBy: req.user.id,
    });

    await customer.save();
    res.status(201).json({ message: 'Customer created successfully', data: customer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create customer', error: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const { search, status } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const customers = await Customer.find(filter)
      .populate('registeredBy', 'userName')
      .sort({ createdAt: -1 });

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customers', error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate('registeredBy', 'userName');

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customer', error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('registeredBy', 'userName');

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully', data: customer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update customer', error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete customer', error: error.message });
  }
};
