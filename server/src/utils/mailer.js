// src/utils/mailer.js — Nodemailer Email Utility
import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send consultation confirmation to client
export const sendConsultationConfirmation = async ({ name, email, service, date, time, bookingRef }) => {
  if (!process.env.EMAIL_USER) return; // Skip if not configured
  const transporter = createTransporter();

  const mailOptions = {
    from: `"OptiChain Consulting" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Consultation Booking Confirmed — Ref #${bookingRef}`,
    html: `
      <div style="font-family: Poppins, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #1B3A6B, #2a5298); padding: 40px 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">
            <span style="color: #ffffff;">Opti</span><span style="color: #E87722;">Chain</span> Consulting
          </h1>
          <p style="color: #ccd6f6; margin: 5px 0 0;">Transforming Operations. Delivering Excellence.</p>
        </div>
        <div style="padding: 40px 30px;">
          <h2 style="color: #1B3A6B;">Your Consultation is Confirmed! ✅</h2>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for booking a consultation with OptiChain Consulting. We look forward to helping you transform your operations.</p>
          
          <div style="background: #F8F9FA; border-left: 4px solid #E87722; padding: 20px; margin: 25px 0; border-radius: 4px;">
            <h3 style="color: #1B3A6B; margin: 0 0 15px;">Booking Details</h3>
            <p style="margin: 5px 0;"><strong>Reference #:</strong> <span style="color: #E87722; font-size: 18px;">${bookingRef}</span></p>
            <p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
          </div>
          
          <p>Our expert consultant will reach out to you within 24 hours to confirm the meeting details and share the agenda.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.CLIENT_URL}/dashboard" style="background: #E87722; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Your Dashboard</a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 13px;">OptiChain Consulting | Pune, Maharashtra | info@optichain.in</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send admin notification for new consultation
export const sendAdminNotification = async ({ name, email, company, service, date, bookingRef }) => {
  if (!process.env.EMAIL_USER || !process.env.ADMIN_EMAIL) return;
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"OptiChain System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `[New Booking] ${service} — Ref #${bookingRef}`,
    html: `
      <h3>New Consultation Booking</h3>
      <p><strong>Ref #:</strong> ${bookingRef}</p>
      <p><strong>Client:</strong> ${name} (${email})</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><a href="${process.env.CLIENT_URL}/admin/consultations">View in Admin Panel</a></p>
    `,
  });
};
