const Customer = require('../models/Customer');
const User = require('../models/User');

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Private/Admin
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, address, squareFeet, contactNumber, siteLocation, buildingType } = req.body;

    // Check if customer with this email already exists
    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
      return res.status(400).json({ message: 'Customer with this email already exists' });
    }

    // Create user account for customer
    const user = await User.create({
      name,
      email,
      password: 'password123', // Default password, should be changed
      role: 'customer'
    });

    // Create customer
    const customer = await Customer.create({
      user: user._id,
      name,
      email,
      address,
      squareFeet,
      contactNumber,
      siteLocation,
      buildingType
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private/Admin
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get customer by ID
// @route   GET /api/customers/:id
// @access  Private
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private/Admin
exports.updateCustomer = async (req, res) => {
  try {
    const { name, address, squareFeet, contactNumber, siteLocation, buildingType } = req.body;

    const customer = await Customer.findById(req.params.id);

    if (customer) {
      customer.name = name || customer.name;
      customer.address = address || customer.address;
      customer.squareFeet = squareFeet || customer.squareFeet;
      customer.contactNumber = contactNumber || customer.contactNumber;
      customer.siteLocation = siteLocation || customer.siteLocation;
      customer.buildingType = buildingType || customer.buildingType;

      const updatedCustomer = await customer.save();
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private/Admin
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (customer) {
      // Also delete the associated user
      await User.findByIdAndDelete(customer.user);
      await customer.remove();
      res.json({ message: 'Customer removed' });
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
