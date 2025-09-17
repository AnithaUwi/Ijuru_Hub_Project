// route/bookingroute.js
import express from 'express';
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  getBookingByReference
} from '../controller/Bookingcontroller.js';

const router = express.Router();

// Create new booking
router.post('/', createBooking);

// Get all bookings (with optional filters)
router.get('/', getAllBookings);

// Get booking by reference
router.get('/reference/:reference', getBookingByReference);

// Update booking status
router.patch('/:id/status', updateBookingStatus);

export default router;