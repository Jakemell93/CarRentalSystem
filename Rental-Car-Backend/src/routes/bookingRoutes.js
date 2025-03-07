const express = require('express');
const { getBookings, getBooking, createBooking, updateBooking, deleteBooking } = require('..controllers/BookingController');
const { protect } = require('../middleware/AuthMiddleware');

const router = express.Router();

// Booking CRUD operations (protected)
router.get('/', protect, getBookings);
router.get('/:id', protect, getBooking);
router.post('/', protect, createBooking);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

module.exports = router;