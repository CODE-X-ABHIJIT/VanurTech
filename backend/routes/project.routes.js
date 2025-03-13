const express = require('express');
const router = express.Router();
const { 
  createProject, 
  getProjects, 
  getProjectById, 
  updateProject, 
  deleteProject, 
  addProjectUpdate, 
  getCustomerProjects 
} = require('../controllers/project.controller');
const { protect, admin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

router.route('/')
  .post(protect, admin, createProject)
  .get(protect, getProjects);

router.route('/customer/:customerId')
  .get(protect, getCustomerProjects);

router.route('/:id')
  .get(protect, getProjectById)
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

router.post(
  '/:id/updates',
  protect,
  admin,
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'videos', maxCount: 2 },
    { name: 'documents', maxCount: 5 }
  ]),
  addProjectUpdate
);

module.exports = router;
