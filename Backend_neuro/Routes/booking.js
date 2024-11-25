const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingControllers');

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get all bookings for a user
router.get('/:userId', getBookings);

module.exports = router;
