// models/bookingmodel.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  
  // Space Info
  spaceName: {
    type: String,
    required: true,
    trim: true
  },
  spaceType: {
    type: String,
    required: true,
    trim: true
  },
  spaceId: {
    type: String,
    required: true,
    trim: true
  },
  
  // Booking Details
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    default: 1
  },
  price: {
    type: String,
    required: true
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  
  // Reference
  bookingReference: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);