import Contact from '../model/contactmodel.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';

// --- Transporter (Gmail App Password; port 465 = secure) ---
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------- Helpers ----------
const brand = {
  name: 'IJURU HUB',
  primary: '#1a3cff',     // primary brand blue
  primarySoft: '#eef2ff',
  bg: '#f6f7fb',
  text: '#111827',
  muted: '#6b7280',
  border: '#eef0f6',
};
const safe = (v, fb = 'Not provided') =>
  typeof v === 'string' && v.trim() ? v.trim() : fb;
const now = () => new Date().toLocaleString('en-GB', { hour12: false });

// Shared CSS (email-safe)
const baseStyles = `
  body{margin:0;background:${brand.bg};font-family:Segoe UI,Arial,Helvetica,sans-serif}
  .wrap{max-width:680px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;
        box-shadow:0 6px 30px rgba(17,24,39,.08);border:1px solid ${brand.border}}
  .hdr{background:${brand.primary};color:#fff;padding:22px 26px}
  .brand{font-size:18px;font-weight:800;letter-spacing:.3px}
  .title{margin-top:6px;font-size:14px;opacity:.9}
  .cnt{padding:26px}
  .row{display:flex;gap:10px;flex-wrap:wrap;margin:8px 0}
  .lbl{color:${brand.muted};min-width:120px}
  .val{color:${brand.text};font-weight:600}
  .badge{display:inline-block;background:${brand.primarySoft};color:${brand.primary};
         font-weight:700;padding:4px 10px;border-radius:999px;font-size:12px}
  .box{background:#fafbff;border:1px solid ${brand.border};border-radius:12px;padding:14px;margin-top:8px}
  .divider{height:1px;background:${brand.border};margin:18px 0}
  .muted{color:${brand.muted}}
  .cta{display:inline-block;margin-top:14px;padding:10px 14px;border-radius:10px;background:${brand.primary};
       color:#fff;text-decoration:none;font-weight:700}
  .ftr{padding:18px 26px;color:${brand.muted};font-size:12px;text-align:center}
`;

// HTML for the ADMIN notification (to ijuruhub1@gmail.com)
const adminHtml = ({ firstName, lastName, email, phone, interest, message }) => `
<!doctype html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head><body>
  <div class="wrap">
    <div class="hdr">
      <div class="brand">${brand.name}</div>
      <div class="title">New Contact <span class="badge">${safe(interest,'General')}</span></div>
    </div>
    <div class="cnt">
      <div class="row"><div class="lbl">Name</div><div class="val">${safe(firstName)} ${safe(lastName,'')}</div></div>
      <div class="row"><div class="lbl">Email</div><div class="val">${safe(email)}</div></div>
      <div class="row"><div class="lbl">Phone</div><div class="val">${safe(phone)}</div></div>
      <div class="row"><div class="lbl">Interest</div><div class="val">${safe(interest,'General')}</div></div>

      <div class="divider"></div>
      <div class="lbl">Message</div>
      <div class="box" style="white-space:pre-wrap;line-height:1.6">${safe(message,'—')}</div>

      <div class="divider"></div>
      <div class="muted">Submitted: ${now()}</div>
      <a class="bg" href="mailto:${safe(email)}?subject=Re:%20${encodeURIComponent(safe(interest,'Inquiry'))}">
        Reply to ${safe(firstName) || 'sender'}
      </a>
    </div>
    <div class="ftr">You’re receiving this because someone submitted the contact form on ${brand.name}.</div>
  </div>
</body></html>
`;

// HTML for the USER confirmation
const userHtml = ({ firstName, interest }) => `
<!doctype html><html><head><meta charset="utf-8"><style>${baseStyles}</style></head><body>
  <div class="wrap">
    <div class="hdr">
      <div class="brand">${brand.name}</div>
      <div class="title">Thanks for contacting us</div>
    </div>
    <div class="cnt">
      <p style="margin:0 0 10px 0;color:${brand.text}">Hi <strong>${safe(firstName)}</strong>,</p>
      <p style="margin:0 0 12px 0;color:${brand.text}">
        Thanks for reaching out! We’ve received your inquiry about <strong>${safe(interest,'our services')}</strong>.
        Our team will get back to you within 24 hours.
      </p>

      <div class="divider"></div>
      <p class="muted" style="margin:0 0 6px 0"><strong>Contact Information</strong></p>
      <div class="row"><div class="lbl">Phone</div><div class="val">${safe(process.env.SUPPORT_PHONE || '+250 798287944')}</div></div>
      <div class="row"><div class="lbl">Email</div><div class="val">${safe(process.env.ADMIN_TO || 'info@ijuruhub.rw')}</div></div>
      <div class="row"><div class="lbl">Address</div><div class="val">${safe(process.env.SUPPORT_ADDRESS || '42 KG 40 St, Kimironko, Kigali, Rwanda')}</div></div>
      <div class="divider"></div>
      <div class="muted">Submitted: ${now()}</div>
    </div>
    <div class="ftr">© ${new Date().getFullYear()} ${brand.name}. All rights reserved.</div>
  </div>
</body></html>
`;

// ---------- Controller ----------
export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, interest, message } = req.body;

    // Save to DB
    const contact = await Contact.create({
      firstName: safe(firstName, ''),
      lastName: safe(lastName, ''),
      email: safe(email, ''),
      phone: safe(phone, ''),
      interest: safe(interest, 'General'),
      message: safe(message, ''),
    });

    const displayName = `${safe(firstName, '')} ${safe(lastName, '')}`.trim() || 'Website Visitor';
    const adminTo = process.env.EMAIL_USER; // ijuruhub1@gmail.com

    // ADMIN mail: show visitor as the sender; authenticate via your Gmail account
    const adminEmail = {
      from: `"${displayName}" <${safe(email)}>`,    // shows "John Doe <john@...>"
      sender: process.env.EMAIL_USER,               // authenticated sender (prevents rejections)
      to: adminTo,
      replyTo: safe(email),
      subject: `New Contact • ${displayName} • ${safe(interest,'General')}`,
      text: [
        `New Contact Form Submission`,
        `Name: ${displayName}`,
        `Email: ${safe(email)}`,
        `Phone: ${safe(phone)}`,
        `Interest: ${safe(interest,'General')}`,
        `Message: ${safe(message,'—')}`,
        `Submitted: ${now()}`,
      ].join('\n'),
      html: adminHtml({ firstName, lastName, email, phone, interest, message }),
    };

    // USER mail: branded confirmation from IJURU HUB
    const userEmail = {
      from: `"${brand.name}" <${process.env.EMAIL_USER}>`,
      to: safe(email),
      replyTo: process.env.ADMIN_TO || 'info@ijuruhub.rw',
      subject: `Thank you for contacting ${brand.name}`,
      text: [
        `Hi ${safe(firstName)},`,
        `Thanks for contacting ${brand.name}. We received your inquiry about ${safe(interest,'our services')}.`,
        `We’ll get back to you within 24 hours.`,
        ``,
        `Contact Information`,
        `Phone: ${safe(process.env.SUPPORT_PHONE || '+250 798287944')}`,
        `Email: ${safe(process.env.ADMIN_TO || 'info@ijuruhub.rw')}`,
        `Address: ${safe(process.env.SUPPORT_ADDRESS || '42 KG 40 St, Kimironko, Kigali, Rwanda')}`,
        ``,
        `Submitted: ${now()}`,
      ].join('\n'),
      html: userHtml({ firstName, interest }),
    };

    await transporter.sendMail(adminEmail);
    await transporter.sendMail(userEmail);

    res.status(201).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
      contactId: contact._id,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
};


export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json({
      success: true,
      contacts: contacts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch contacts.' 
    });
  }
};
