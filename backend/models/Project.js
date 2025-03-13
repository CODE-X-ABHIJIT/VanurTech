const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  images: [{
    type: String
  }],
  videos: [{
    type: String
  }],
  documents: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  updates: [updateSchema],
  currentProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
