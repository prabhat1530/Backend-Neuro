const express = require('express');
const {
  listServices,
  addService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

const router = express.Router();

// List all services
router.get('/', listServices);

// Add a new service
router.post('/', addService);

// Update a service by ID
router.put('/:id', updateService);

// Delete a service by ID
router.delete('/:id', deleteService);

module.exports = router;
