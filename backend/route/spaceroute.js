// route/spaceroute.js
import express from 'express';
import {
  getAllSpaces,
  getSpacesByType,
  addOccupant,
  removeOccupant,
  getSpaceStats,
  resetSpaces,
  getSpaceById,
  createManualBooking
} from '../controller/spacecontroller.js';

const router = express.Router();

// Get all spaces with current availability
router.get('/', getAllSpaces);

// Get spaces by type with availability
router.get('/type/:type', getSpacesByType);

// Get specific space by ID
router.get('/:spaceId', getSpaceById);

// Get space statistics
router.get('/stats', getSpaceStats);

// Add occupant to space (manual booking by receptionist)
router.put('/:spaceId/occupant', addOccupant);

// Remove occupant from space
router.delete('/:spaceId/occupant', removeOccupant);

// Create manual booking (for receptionist use)
router.post('/manual-booking', createManualBooking);

// Reset all spaces (for testing)
router.post('/reset', resetSpaces);

export default router;