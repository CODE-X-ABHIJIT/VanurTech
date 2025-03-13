const express = require('express');
const router = express.Router();
const { 
  createCustomer, 
  getCustomers, 
  getCustomerById, 
  updateCustomer, 
  deleteCustomer 
} = require('../controllers/customer.controller');
const { protect, admin } = require('../middleware/auth.middleware');

router.route('/')
  .post(protect, admin, createCustomer)
  .get(protect, admin, getCustomers);

router.route('/:id')
  .get(protect, getCustomerById)
  .put(protect, admin, updateCustomer)
  .delete(protect, admin, deleteCustomer);

module.exports = router;
