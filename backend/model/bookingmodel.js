import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  // User Information
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

  // Booking Details
  spaceType: {
    type: String,
    required: true,
    enum: ['Hot Desk', 'Dedicated Desk', 'Private Office', 'Meeting Room']
  },
  spaceName: {
    type: String,
    required: true // e.g., "Table 1 - Seat A", "Meeting Room A", etc.
  },
  spaceId: {
    type: String,
    required: true // e.g., "t1s1", "mr1", etc.
  },

  // Date & Time
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true // e.g., "09:00"
  },
  duration: {
    type: String,
    required: true // e.g., "1", "2", "4", "8"
  },

  // Pricing
  price: {
    type: String,
    required: true // e.g., "5,000 RWF/hour"
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },

  // Metadata
  bookingReference: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Generate booking reference before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    const prefix = this.spaceType === 'Hot Desk' ? 'HD' : 
                   this.spaceType === 'Dedicated Desk' ? 'DD' :
                   this.spaceType === 'Private Office' ? 'PO' : 'MR';
    const timestamp = Date.now().toString().slice(-6);
    this.bookingReference = `${prefix}${timestamp}`;
  }
  next();
});

export default mongoose.model('Booking', bookingSchema);