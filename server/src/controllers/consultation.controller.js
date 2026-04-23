// src/controllers/consultation.controller.js — Booking CRUD + Nodemailer
import Consultation from '../models/Consultation.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendConsultationConfirmation, sendAdminNotification } from '../utils/mailer.js';

// POST /api/consultations — Public booking
export const createConsultation = asyncHandler(async (req, res) => {
  const { name, email, phone, company, designation, service, preferredDate, preferredTime, message, howDidYouHear } = req.body;

  const consultation = await Consultation.create({
    name, email, phone, company, designation, service,
    preferredDate, preferredTime, message, howDidYouHear,
    userId: req.user?._id,
  });

  // Send emails (non-blocking)
  sendConsultationConfirmation({
    name, email, service,
    date: preferredDate,
    time: preferredTime,
    bookingRef: consultation.bookingRef,
  }).catch(console.error);

  sendAdminNotification({
    name, email, company, service,
    date: preferredDate,
    bookingRef: consultation.bookingRef,
  }).catch(console.error);

  res.status(201).json({
    success: true,
    message: 'Consultation booked successfully! Check your email for confirmation.',
    bookingRef: consultation.bookingRef,
    consultation,
  });
});

// GET /api/consultations — Admin: all bookings
export const getAllConsultations = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = status ? { status } : {};

  const total = await Consultation.countDocuments(filter);
  const consultations = await Consultation.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({ success: true, total, consultations });
});

// GET /api/consultations/my — Client: own bookings
export const getMyConsultations = asyncHandler(async (req, res) => {
  const consultations = await Consultation.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, consultations });
});

// PUT /api/consultations/:id — Admin: update status
export const updateConsultationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const consultation = await Consultation.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );
  if (!consultation) return res.status(404).json({ success: false, message: 'Consultation not found.' });
  res.json({ success: true, consultation });
});

// DELETE /api/consultations/:id — Admin
export const deleteConsultation = asyncHandler(async (req, res) => {
  const consultation = await Consultation.findByIdAndDelete(req.params.id);
  if (!consultation) return res.status(404).json({ success: false, message: 'Consultation not found.' });
  res.json({ success: true, message: 'Consultation deleted.' });
});
