// controllers/bookingcontroller.js
import Booking from '../model/bookingmodel.js';
import Space from '../model/spacemodel.js';
import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Brand configuration
const brand = {
  name: 'iJuru Hub',
  text: '#1a1a1a',
  primary: '#2563eb'
};

// Base email styles
const baseStyles = `
  .wrap{max-width:600px;margin:0 auto;font-family:Arial,sans-serif;background:#fff}
  .hdr{background:${brand.primary};color:#fff;padding:20px;text-align:center}
  .brand{font-size:24px;font-weight:bold;margin-bottom:5px}
  .title{font-size:16px;opacity:0.9}
  .cnt{padding:30px 20px}
  .box{background:#f8f9fa;border:1px solid #e9ecef;border-radius:8px;padding:20px;margin:20px 0}
  .row{display:flex;justify-content:space-between;margin:8px 0;padding:8px 0;border-bottom:1px solid #eee}
  .lbl{font-weight:bold;color:#666}
  .val{color:${brand.text}}
  .highlight{background:#fef3cd;border:1px solid #ffeaa7;border-radius:8px;padding:15px;margin:15px 0}
  .divider{height:1px;background:#e9ecef;margin:25px 0}
  .ftr{background:#f8f9fa;padding:15px;text-align:center;color:#666;font-size:12px}
  .muted{color:#666;font-size:14px}
`;

// Safe HTML helper
const safe = (str) => String(str || '').replace(/[&<>"']/g, (m) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[m]);

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const {
      name, email, phone, spaceName, spaceType, spaceId,
      date, time, duration, price, message
    } = req.body;

    // Validation
    const requiredFields = [
      { field: 'name', value: name },
      { field: 'email', value: email },
      { field: 'phone', value: phone },
      { field: 'spaceName', value: spaceName },
      { field: 'spaceType', value: spaceType },
      { field: 'spaceId', value: spaceId },
      { field: 'date', value: date },
      { field: 'time', value: time }
    ];

    for (const { field, value } of requiredFields) {
      if (!value?.toString().trim()) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    // Check if space is available
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
        message: 'Space is no longer available'
      });
    }

    // Validate date is not in the past
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book for past dates'
      });
    }

    // Generate booking reference
    const bookingReference = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create booking
    const newBooking = new Booking({
      bookingReference,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      spaceName: spaceName.trim(),
      spaceType: spaceType.trim(),
      spaceId: spaceId.trim(),
      date: bookingDate,
      time: time.trim(),
      duration: parseInt(duration) || 1,
      price: price || 'TBD',
      message: message?.trim() || '',
      status: 'confirmed', // Auto-confirm for better UX
      paymentStatus: 'pending'
    });

    const savedBooking = await newBooking.save();

    // Update space availability
    await space.addOccupant(name.trim(), phone.trim());

    // Send confirmation emails
    await sendBookingEmails(savedBooking);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully! Check your email for confirmation.',
      booking: savedBooking,
      bookingReference: bookingReference
    });

  } catch (error) {
    console.error('Create booking error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create booking. Please try again.'
    });
  }
};

// Send booking confirmation emails
const sendBookingEmails = async (booking) => {
  try {
    // Customer confirmation email
    const customerHtml = `
      <!doctype html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head><body>
        <div class="wrap">
          <div class="hdr">
            <div class="brand">${brand.name}</div>
            <div class="title">Booking Confirmation</div>
          </div>
          <div class="cnt">
            <p style="margin:0 0 10px 0;color:${brand.text}">Hi <strong>${safe(booking.name)}</strong>,</p>
            <p style="margin:0 0 12px 0;color:${brand.text}">Thank you for booking with us! Your reservation has been confirmed.</p>

            <div class="box">
              <div class="row"><div class="lbl">Booking Reference</div><div class="val">${booking.bookingReference}</div></div>
              <div class="row"><div class="lbl">Space</div><div class="val">${safe(booking.spaceName)} (${safe(booking.spaceType)})</div></div>
              <div class="row"><div class="lbl">Date</div><div class="val">${new Date(booking.date).toLocaleDateString()}</div></div>
              <div class="row"><div class="lbl">Time</div><div class="val">${safe(booking.time)} (${safe(booking.duration)} hours)</div></div>
              <div class="row"><div class="lbl">Price</div><div class="val">${safe(booking.price)}</div></div>
              <div class="row"><div class="lbl">Status</div><div class="val">CONFIRMED</div></div>
            </div>

            <div class="highlight">
              <h4 style="margin:0 0 8px 0;color:#92400e">Payment Required</h4>
              <p style="margin:0;color:#92400e">
                <strong>Mobile Money:</strong> ${process.env.PAYMENT_NUMBER || '+250 798287944'}<br>
                <strong>Amount:</strong> ${safe(booking.price)}<br>
                <strong>Reference:</strong> ${booking.bookingReference}
              </p>
            </div>

            <div class="divider"></div>
            <p class="muted" style="margin:0 0 6px 0"><strong>Contact Information</strong></p>
            <div class="row"><div class="lbl">Phone</div><div class="val">${process.env.SUPPORT_PHONE || '+250 798287944'}</div></div>
            <div class="row"><div class="lbl">Email</div><div class="val">${process.env.ADMIN_EMAIL || 'info@ijuruhub.rw'}</div></div>
          </div>
          <div class="ftr">© ${new Date().getFullYear()} ${brand.name}. All rights reserved.</div>
        </div>
      </body></html>
    `;

    // Admin notification email
    const adminHtml = `
      <!doctype html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head><body>
        <div class="wrap">
          <div class="hdr">
            <div class="brand">${brand.name}</div>
            <div class="title">New Booking Alert</div>
          </div>
          <div class="cnt">
            <p style="margin:0 0 10px 0;color:${brand.text}"><strong>New booking received!</strong></p>

            <div class="box">
              <div class="row"><div class="lbl">Reference</div><div class="val">${booking.bookingReference}</div></div>
              <div class="row"><div class="lbl">Customer</div><div class="val">${safe(booking.name)}</div></div>
              <div class="row"><div class="lbl">Email</div><div class="val">${safe(booking.email)}</div></div>
              <div class="row"><div class="lbl">Phone</div><div class="val">${safe(booking.phone)}</div></div>
              <div class="row"><div class="lbl">Space</div><div class="val">${safe(booking.spaceName)} (${safe(booking.spaceType)})</div></div>
              <div class="row"><div class="lbl">Date</div><div class="val">${new Date(booking.date).toLocaleDateString()}</div></div>
              <div class="row"><div class="lbl">Time</div><div class="val">${safe(booking.time)} (${safe(booking.duration)} hours)</div></div>
              <div class="row"><div class="lbl">Price</div><div class="val">${safe(booking.price)}</div></div>
              ${booking.message ? `<div class="row"><div class="lbl">Message</div><div class="val">${safe(booking.message)}</div></div>` : ''}
            </div>

            <p style="margin:16px 0;color:${brand.text}">
              <strong>Action Required:</strong> Space ${safe(booking.spaceName)} has been automatically marked as occupied.
            </p>
          </div>
          <div class="ftr">© ${new Date().getFullYear()} ${brand.name}. All rights reserved.</div>
        </div>
      </body></html>
    `;

    // Send customer email
    const customerEmail = {
      from: `"${brand.name}" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: `Booking Confirmed • ${booking.bookingReference} • ${brand.name}`,
      html: customerHtml
    };

    // Send admin email
    const adminEmail = {
      from: `"${brand.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Booking • ${booking.bookingReference} • ${brand.name}`,
      html: adminHtml
    };

    await Promise.all([
      transporter.sendMail(customerEmail),
      transporter.sendMail(adminEmail)
    ]);

    console.log('Booking confirmation emails sent successfully');

  } catch (error) {
    console.error('Error sending booking emails:', error);
    // Don't fail the booking if email fails
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 50, status, paymentStatus, search } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (paymentStatus && paymentStatus !== 'all') {
      query.paymentStatus = paymentStatus;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { bookingReference: { $regex: search, $options: 'i' } },
        { spaceName: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: bookings.length,
        totalBookings: total
      }
    });

  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    // If booking is cancelled, free up the space
    if (updates.status === 'cancelled') {
      const space = await Space.findOne({ id: booking.spaceId });
      if (space && space.status === 'occupied') {
        await space.removeOccupant();
      }
    }

    res.json({
      success: true,
      message: 'Booking updated successfully',
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking'
    });
  }
};

// Get booking by reference
export const getBookingByReference = async (req, res) => {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({
        success: false,
        message: 'Booking reference is required'
      });
    }

    const booking = await Booking.findOne({ bookingReference: reference });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });

  } catch (error) {
    console.error('Get booking by reference error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking'
    });
  }
};