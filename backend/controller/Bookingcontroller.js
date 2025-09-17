// Add this to your booking controller file
import Booking from '../model/bookingmodel.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';

// Update booking status or payment status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate the booking ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    // Validate status values
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const validPaymentStatuses = ['pending', 'paid', 'failed'];

    if (updates.status && !validStatuses.includes(updates.status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking status'
      });
    }

    if (updates.paymentStatus && !validPaymentStatuses.includes(updates.paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status'
      });
    }

    // Find and update the booking
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update the booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { 
        ...updates,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    // Send notification emails based on status changes
    await sendStatusUpdateNotification(updatedBooking, updates);

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

// Send notification emails for status updates
const sendStatusUpdateNotification = async (booking, updates) => {
  try {
    // Only send emails for significant status changes
    if (updates.status === 'confirmed' || updates.paymentStatus === 'paid') {
      
      let subject = '';
      let message = '';
      
      if (updates.status === 'confirmed') {
        subject = `Booking Confirmed • ${booking.bookingReference} • ${brand.name}`;
        message = `Your booking has been confirmed! Reference: ${booking.bookingReference}`;
      } else if (updates.paymentStatus === 'paid') {
        subject = `Payment Confirmed • ${booking.bookingReference} • ${brand.name}`;
        message = `Thank you! Your payment has been confirmed. Reference: ${booking.bookingReference}`;
      }

      const statusUpdateHtml = `
        <!doctype html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head><body>
          <div class="wrap">
            <div class="hdr">
              <div class="brand">${brand.name}</div>
              <div class="title">Booking Update</div>
            </div>
            <div class="cnt">
              <p style="margin:0 0 10px 0;color:${brand.text}">Hi <strong>${safe(booking.name)}</strong>,</p>
              <p style="margin:0 0 12px 0;color:${brand.text}">${message}</p>

              <div class="box">
                <div class="row"><div class="lbl">Booking ID</div><div class="val">${booking.bookingReference}</div></div>
                <div class="row"><div class="lbl">Space</div><div class="val">${safe(booking.spaceName)} (${safe(booking.spaceType)})</div></div>
                <div class="row"><div class="lbl">Date</div><div class="val">${new Date(booking.date).toLocaleDateString()}</div></div>
                <div class="row"><div class="lbl">Time</div><div class="val">${safe(booking.time)} (${safe(booking.duration)} hours)</div></div>
                <div class="row"><div class="lbl">Price</div><div class="val">${safe(booking.price)}</div></div>
                <div class="row"><div class="lbl">Status</div><div class="val">${booking.status?.toUpperCase()}</div></div>
                <div class="row"><div class="lbl">Payment</div><div class="val">${booking.paymentStatus?.toUpperCase()}</div></div>
              </div>

              ${booking.paymentStatus === 'pending' ? `
              <div class="highlight">
                <h4 style="margin:0 0 8px 0;color:#92400e">Payment Still Required</h4>
                <p style="margin:0;color:#92400e">
                  <strong>Mobile Money:</strong> ${process.env.PAYMENT_NUMBER || '+250 798287944'}<br>
                  <strong>Amount:</strong> ${safe(booking.price)}<br>
                  <strong>Reference:</strong> ${booking.bookingReference}
                </p>
              </div>
              ` : ''}

              <div class="divider"></div>
              <p class="muted" style="margin:0 0 6px 0"><strong>Contact Information</strong></p>
              <div class="row"><div class="lbl">Phone</div><div class="val">${process.env.SUPPORT_PHONE || '+250 798287944'}</div></div>
              <div class="row"><div class="lbl">Email</div><div class="val">${process.env.ADMIN_TO || 'info@ijuruhub.rw'}</div></div>
            </div>
            <div class="ftr">© ${new Date().getFullYear()} ${brand.name}. All rights reserved.</div>
          </div>
        </body></html>
      `;

      // Send email to customer
      const userEmail = {
        from: `"${brand.name}" <${process.env.EMAIL_USER}>`,
        to: booking.email,
        subject: subject,
        html: statusUpdateHtml
      };

      await transporter.sendMail(userEmail);
    }
  } catch (error) {
    console.error('Error sending status update notification:', error);
    // Don't fail the main request if email fails
  }
};

// Get booking statistics
export const getBookingStats = async (req, res) => {
  try {
    const bookings = await Booking.find();
    
    const stats = {
      total: bookings.length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      pending: bookings.filter(b => b.status === 'pending').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      
      pendingPayments: bookings.filter(b => b.paymentStatus === 'pending').length,
      paidBookings: bookings.filter(b => b.paymentStatus === 'paid').length,
      failedPayments: bookings.filter(b => b.paymentStatus === 'failed').length,
      
      // Revenue calculation
      revenue: bookings
        .filter(b => b.paymentStatus === 'paid')
        .reduce((total, booking) => {
          const price = parseFloat(booking.price?.toString().replace(/[^\d.]/g, '') || 0);
          return total + price;
        }, 0),
      
      // Space type breakdown
      spaceTypes: {
        hotDesk: bookings.filter(b => b.spaceType === 'Hot Desk').length,
        meetingRoom: bookings.filter(b => b.spaceType === 'Meeting Room').length,
        privateOffice: bookings.filter(b => b.spaceType === 'Private Office').length,
        eventSpace: bookings.filter(b => b.spaceType === 'Event Space').length
      }
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Get booking stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking statistics'
    });
  }
};

// Bulk update bookings (for admin convenience)
export const bulkUpdateBookings = async (req, res) => {
  try {
    const { bookingIds, updates } = req.body;

    if (!bookingIds || !Array.isArray(bookingIds) || bookingIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Booking IDs array is required'
      });
    }

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Updates object is required'
      });
    }

    // Validate status values
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const validPaymentStatuses = ['pending', 'paid', 'failed'];

    if (updates.status && !validStatuses.includes(updates.status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking status'
      });
    }

    if (updates.paymentStatus && !validPaymentStatuses.includes(updates.paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status'
      });
    }

    // Update multiple bookings
    const result = await Booking.updateMany(
      { _id: { $in: bookingIds } },
      { 
        ...updates,
        updatedAt: new Date()
      }
    );

    // Get updated bookings for notifications
    const updatedBookings = await Booking.find({ _id: { $in: bookingIds } });

    // Send notifications for each booking
    for (const booking of updatedBookings) {
      await sendStatusUpdateNotification(booking, updates);
    }

    res.json({
      success: true,
      message: `Successfully updated ${result.modifiedCount} bookings`,
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update bookings'
    });
  }
};

// Get bookings by date range (for calendar view)
export const getBookingsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate, spaceType, status } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    // Build query
    let query = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    if (spaceType && spaceType !== 'all') {
      query.spaceType = spaceType;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .sort({ date: 1, time: 1 })
      .limit(500); // Reasonable limit

    res.json({
      success: true,
      bookings,
      count: bookings.length
    });

  } catch (error) {
    console.error('Get bookings by date range error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
};

// Delete booking (soft delete - mark as cancelled)
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Soft delete - update status to cancelled
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { 
        status: 'cancelled',
        cancellationReason: reason || 'Cancelled by admin',
        cancelledAt: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    );

    // Send cancellation email to customer
    const cancellationHtml = `
      <!doctype html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head><body>
        <div class="wrap">
          <div class="hdr">
            <div class="brand">${brand.name}</div>
            <div class="title">Booking Cancelled</div>
          </div>
          <div class="cnt">
            <p style="margin:0 0 10px 0;color:${brand.text}">Hi <strong>${safe(booking.name)}</strong>,</p>
            <p style="margin:0 0 12px 0;color:${brand.text}">
              We regret to inform you that your booking has been cancelled.
            </p>

            <div class="box">
              <div class="row"><div class="lbl">Booking ID</div><div class="val">${booking.bookingReference}</div></div>
              <div class="row"><div class="lbl">Space</div><div class="val">${safe(booking.spaceName)}</div></div>
              <div class="row"><div class="lbl">Date</div><div class="val">${new Date(booking.date).toLocaleDateString()}</div></div>
              <div class="row"><div class="lbl">Time</div><div class="val">${safe(booking.time)}</div></div>
              ${reason ? `<div class="row"><div class="lbl">Reason</div><div class="val">${safe(reason)}</div></div>` : ''}
            </div>

            <p style="margin:16px 0;color:${brand.text}">
              If you have any questions, please contact us at ${process.env.SUPPORT_PHONE || '+250 798287944'}.
            </p>

            <div class="divider"></div>
            <p class="muted">We apologize for any inconvenience caused.</p>
          </div>
          <div class="ftr">© ${new Date().getFullYear()} ${brand.name}. All rights reserved.</div>
        </div>
      </body></html>
    `;

    // Send cancellation email
    const cancellationEmail = {
      from: `"${brand.name}" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: `Booking Cancelled • ${booking.bookingReference} • ${brand.name}`,
      html: cancellationHtml
    };

    await transporter.sendMail(cancellationEmail);

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
};

// Add these missing functions to your Bookingcontroller.js file

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      spaceName,
      spaceType,
      date,
      time,
      duration,
      price,
      message
    } = req.body;

    // Basic validation
    if (!name || !email || !phone || !spaceName || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing'
      });
    }

    // Generate booking reference
    const bookingReference = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create new booking
    const newBooking = new Booking({
      bookingReference,
      name,
      email,
      phone,
      spaceName,
      spaceType,
      date: new Date(date),
      time,
      duration: duration || 1,
      price,
      message,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedBooking = await newBooking.save();

    // Send confirmation email (implement your email logic here)
    // await sendBookingConfirmationEmail(savedBooking);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: savedBooking,
      bookingReference: bookingReference
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking'
    });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 50, status, paymentStatus, search } = req.query;
    
    // Build query
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