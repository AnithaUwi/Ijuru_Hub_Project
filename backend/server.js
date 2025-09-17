// server.js (FIRST LINES)
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import contactRoutes from './route/contactroute.js';
import bookingRoutes from './route/bookingroute.js';

const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const db_pass = process.env.DB_PASS;
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbUri = `mongodb+srv://${db_user}:${encodeURIComponent(db_pass)}@cluster0.tqrwlbh.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    // Don't exit in production as this might terminate the container
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};
connectDB();

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/booking', bookingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

