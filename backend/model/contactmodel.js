import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
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
    trim: true
  },
  interest: {
    type: String,
    required: true,
    enum: ['Hot Desk', 'Dedicated Desk', 'Private Office', 'Meeting Room', 'General Inquiry']
  },
  message: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;