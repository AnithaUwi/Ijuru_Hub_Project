// routes/bookingRoutes.js
import express from 'express';
import { 
  createBooking, 
  getAllBookings, 
  getBookingByReference,
  updateBookingStatus,
  getBookingStats,
  bulkUpdateBookings,
  getBookingsByDateRange,
  deleteBooking
} from '../controller/Bookingcontroller.js';

const router = express.Router();

// Create new booking
router.post('/', createBooking);

// Get all bookings (for admin dashboard)
router.get('/', getAllBookings);

// Get booking statistics
router.get('/stats', getBookingStats);

// Get bookings by date range
router.get('/date-range', getBookingsByDateRange);

// Get booking by reference
router.get('/reference/:reference', getBookingByReference);

// Update booking status or payment status
router.patch('/:id/status', updateBookingStatus);

// Bulk update bookings
router.patch('/bulk-update', bulkUpdateBookings);

// Delete (cancel) booking
router.delete('/:id', deleteBooking);

export default router;