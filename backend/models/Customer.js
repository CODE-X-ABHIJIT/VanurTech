const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  squareFeet: {
    type: Number,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  siteLocation: {
    type: String,
    required: true
  },
  buildingType: {
    type: String,
    enum: ['Commercial', 'Residential'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
