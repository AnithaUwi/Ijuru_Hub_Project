// controllers/spacecontroller.js
import Space from '../model/spacemodel.js';

export const getAllSpaces = async (req, res) => {
  try {
    const allSpaces = await Space.find();
    
    // Group spaces by type for easier frontend consumption
    const groupedSpaces = {
      hotDesks: allSpaces.filter(s => s.type === 'Hot Desk'),
      dedicatedDesks: allSpaces.filter(s => s.type === 'Dedicated Desk'),
      privateOffices: allSpaces.filter(s => s.type === 'Private Office'),
      meetingRooms: allSpaces.filter(s => s.type === 'Meeting Room')
    };

    res.json({
      success: true,
      spaces: groupedSpaces
    });
  } catch (error) {
    console.error('Get spaces error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch spaces'
    });
  }
};

export const getSpacesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const spaceTypeMap = {
      'hot-desk': 'Hot Desk',
      'dedicated-desk': 'Dedicated Desk',
      'private-office': 'Private Office',
      'meeting-room': 'Meeting Room'
    };

    const spaceType = spaceTypeMap[type];
    if (!spaceType) {
      return res.status(400).json({
        success: false,
        message: 'Invalid space type'
      });
    }

    const spaces = await Space.find({ type: spaceType });
    
    res.json({
      success: true,
      spaces: spaces,
      available: spaces.filter(s => s.status === 'available').length,
      total: spaces.length
    });
  } catch (error) {
    console.error('Get spaces by type error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch spaces by type'
    });
  }
};

export const addOccupant = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone are required'
      });
    }

    const space = await Space.findOne({ id: spaceId });
    if (!space) {
      return res.status(404).json({
        success: false,
        message: 'Space not found'
      });
    }

    if (space.status === 'occupied') {
      return res.status(400).json({
        success: false,
        message: 'Space is already occupied'
      });
    }

    await space.addOccupant(name, phone);

    res.json({
      success: true,
      message: 'Occupant added successfully',
      space: space
    });

  } catch (error) {
    console.error('Add occupant error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add occupant'
    });
  }
};

export const removeOccupant = async (req, res) => {
  try {
    const { spaceId } = req.params;

    const space = await Space.findOne({ id: spaceId });
    if (!space) {
      return res.status(404).json({
        success: false,
        message: 'Space not found'
      });
    }

    if (space.status === 'available') {
      return res.status(400).json({
        success: false,
        message: 'Space is already available'
      });
    }

    await space.removeOccupant();

    res.json({
      success: true,
      message: 'Space marked as available',
      space: space
    });

  } catch (error) {
    console.error('Remove occupant error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove occupant'
    });
  }
};

export const getSpaceStats = async (req, res) => {
  try {
    const allSpaces = await Space.find();

    const stats = {
      total: allSpaces.length,
      available: allSpaces.filter(s => s.status === 'available').length,
      occupied: allSpaces.filter(s => s.status === 'occupied').length,
      byType: {
        hotDesks: {
          total: allSpaces.filter(s => s.type === 'Hot Desk').length,
          available: allSpaces.filter(s => s.type === 'Hot Desk' && s.status === 'available').length,
          occupied: allSpaces.filter(s => s.type === 'Hot Desk' && s.status === 'occupied').length
        },
        dedicatedDesks: {
          total: allSpaces.filter(s => s.type === 'Dedicated Desk').length,
          available: allSpaces.filter(s => s.type === 'Dedicated Desk' && s.status === 'available').length,
          occupied: allSpaces.filter(s => s.type === 'Dedicated Desk' && s.status === 'occupied').length
        },
        privateOffices: {
          total: allSpaces.filter(s => s.type === 'Private Office').length,
          available: allSpaces.filter(s => s.type === 'Private Office' && s.status === 'available').length,
          occupied: allSpaces.filter(s => s.type === 'Private Office' && s.status === 'occupied').length
        },
        meetingRooms: {
          total: allSpaces.filter(s => s.type === 'Meeting Room').length,
          available: allSpaces.filter(s => s.type === 'Meeting Room' && s.status === 'available').length,
          occupied: allSpaces.filter(s => s.type === 'Meeting Room' && s.status === 'occupied').length
        }
      }
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Get space stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch space statistics'
    });
  }
};

export const resetSpaces = async (req, res) => {
  try {
    // Remove all existing spaces
    await Space.deleteMany({});
    
    // Re-initialize default spaces
    await Space.initializeDefaultSpaces();

    res.json({
      success: true,
      message: 'All spaces reset to default state'
    });
  } catch (error) {
    console.error('Reset spaces error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset spaces'
    });
  }
};

export const getSpaceById = async (req, res) => {
  try {
    const { spaceId } = req.params;
    const space = await Space.findOne({ id: spaceId });

    if (!space) {
      return res.status(404).json({
        success: false,
        message: 'Space not found'
      });
    }

    res.json({
      success: true,
      space: space
    });
  } catch (error) {
    console.error('Get space by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch space'
    });
  }
};

// Manual booking by receptionist
export const createManualBooking = async (req, res) => {
  try {
    const { spaceId, name, phone, notes } = req.body;

    if (!spaceId || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Space ID, name, and phone are required'
      });
    }

    const space = await Space.findOne({ id: spaceId });
    if (!space) {
      return res.status(404).json({
        success: false,
        message: 'Space not found'
      });
    }

    if (space.status === 'occupied') {
      return res.status(400).json({
        success: false,
        message: 'Space is already occupied'
      });
    }

    // Add occupant to space
    await space.addOccupant(name, phone);

    // Import Booking model dynamically to avoid circular dependency
    const { default: Booking } = await import('../models/bookingmodel.js');

    // Create a booking record for tracking
    const bookingReference = `MN${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const manualBooking = new Booking({
      bookingReference,
      name: name.trim(),
      email: 'manual@booking.local', // Placeholder for manual bookings
      phone: phone.trim(),
      spaceName: space.name,
      spaceType: space.type,
      spaceId: spaceId.trim(),
      date: new Date(),
      time: new Date().toLocaleTimeString(),
      duration: 1,
      price: space.price,
      message: notes || 'Manual booking by receptionist',
      status: 'confirmed',
      paymentStatus: 'pending'
    });

    await manualBooking.save();

    res.json({
      success: true,
      message: 'Manual booking created successfully',
      booking: manualBooking,
      space: space
    });

  } catch (error) {
    console.error('Manual booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create manual booking'
    });
  }
};