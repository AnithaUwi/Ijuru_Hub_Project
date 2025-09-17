// models/spacemodel.js
import mongoose from 'mongoose';

const spaceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Hot Desk', 'Dedicated Desk', 'Private Office', 'Meeting Room']
  },
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available'
  },
  occupant: {
    name: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      default: null
    }
  },
  price: {
    type: String,
    required: true
  },
  capacity: {
    type: String,
    default: null // Only for meeting rooms
  },
  occupiedAt: {
    type: Date,
    default: null
  },
  vacatedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Static method to initialize default spaces
spaceSchema.statics.initializeDefaultSpaces = async function() {
  const count = await this.countDocuments();
  if (count === 0) {
    const defaultSpaces = [
      // Hot Desks
      { id: 'hd1', name: 'Table 1 - Seat A', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd2', name: 'Table 1 - Seat B', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd3', name: 'Table 1 - Seat C', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd4', name: 'Table 1 - Seat D', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd5', name: 'Table 2 - Seat A', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd6', name: 'Table 2 - Seat B', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd7', name: 'Table 2 - Seat C', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd8', name: 'Table 2 - Seat D', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd9', name: 'Table 3 - Seat A', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd10', name: 'Table 3 - Seat B', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd11', name: 'Table 3 - Seat C', type: 'Hot Desk', price: '5,000 RWF/hour' },
      { id: 'hd12', name: 'Table 3 - Seat D', type: 'Hot Desk', price: '5,000 RWF/hour' },
      
      // Dedicated Desks
      { id: 'dd1', name: 'Private Desk 1', type: 'Dedicated Desk', price: '90,000 RWF/month' },
      { id: 'dd2', name: 'Private Desk 2', type: 'Dedicated Desk', price: '90,000 RWF/month' },
      { id: 'dd3', name: 'Public Desk (Shared)', type: 'Dedicated Desk', price: '90,000 RWF/month' },
      
      // Private Offices
      { id: 'po1', name: 'Private Room 1', type: 'Private Office', price: '120,000 RWF/month' },
      { id: 'po2', name: 'Private Room 2', type: 'Private Office', price: '120,000 RWF/month' },
      
      // Meeting Rooms
      { id: 'mr1', name: 'Meeting Room A (Large)', type: 'Meeting Room', price: '10,000 RWF/hour', capacity: 'Up to 6 People' },
      { id: 'mr2', name: 'Meeting Room B (Small)', type: 'Meeting Room', price: '8,000 RWF/hour', capacity: 'Up to 4 People' },
      { id: 'mr3', name: 'Meeting Room C (Small)', type: 'Meeting Room', price: '8,000 RWF/hour', capacity: 'Up to 4 People' }
    ];

    try {
      await this.insertMany(defaultSpaces);
      console.log('Default spaces initialized successfully');
    } catch (error) {
      console.error('Error initializing default spaces:', error);
    }
  }
};

// Instance method to add occupant
spaceSchema.methods.addOccupant = function(name, phone) {
  this.status = 'occupied';
  this.occupant = { name: name.trim(), phone: phone.trim() };
  this.occupiedAt = new Date();
  this.vacatedAt = null;
  return this.save();
};

// Instance method to remove occupant
spaceSchema.methods.removeOccupant = function() {
  this.status = 'available';
  this.occupant = { name: null, phone: null };
  this.vacatedAt = new Date();
  return this.save();
};

const Space = mongoose.model('Space', spaceSchema);

export default Space;