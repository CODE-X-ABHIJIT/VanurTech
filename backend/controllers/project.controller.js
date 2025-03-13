const Project = require('../models/Project');
const Customer = require('../models/Customer');
const fs = require('fs');
const path = require('path');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
exports.createProject = async (req, res) => {
  try {
    const { name, customer, description } = req.body;

    // Check if customer exists
    const customerExists = await Customer.findById(customer);
    if (!customerExists) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Create project
    const project = await Project.create({
      name,
      customer,
      description
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private/Admin
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate('customer', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get customer projects
// @route   GET /api/projects/customer/:customerId
// @access  Private
exports.getCustomerProjects = async (req, res) => {
  try {
    const projects = await Project.find({ customer: req.params.customerId }).populate('customer', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('customer', 'name email');
    
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private/Admin
exports.updateProject = async (req, res) => {
  try {
    const { name, description, status, currentProgress } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
      project.name = name || project.name;
      project.description = description || project.description;
      project.status = status || project.status;
      project.currentProgress = currentProgress || project.currentProgress;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add project update
// @route   POST /api/projects/:id/updates
// @access  Private/Admin
exports.addProjectUpdate = async (req, res) => {
  try {
    const { description, progress } = req.body;
    const files = req.files;
    
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const update = {
      description,
      progress,
      images: [],
      videos: [],
      documents: []
    };

    // Handle uploaded files
    if (files) {
      if (files.images) {
        update.images = files.images.map(file => `/uploads/${file.filename}`);
      }
      if (files.videos) {
        update.videos = files.videos.map(file => `/uploads/${file.filename}`);
      }
      if (files.documents) {
        update.documents = files.documents.map(file => `/uploads/${file.filename}`);
      }
    }

    project.updates.push(update);
    project.currentProgress = progress;
    
    if (progress === 100) {
      project.status = 'Completed';
    } else if (progress > 0) {
      project.status = 'In Progress';
    }

    const updatedProject = await project.save();
    res.status(201).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (project) {
      // Delete associated files
      project.updates.forEach(update => {
        [...update.images, ...update.videos, ...update.documents].forEach(file => {
          const filePath = path.join(__dirname, '..', file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      });
      
      await project.remove();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
