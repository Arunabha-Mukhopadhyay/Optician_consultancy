// src/models/Consultation.model.js — Consultation booking schema
import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    designation: { type: String },
    service: {
      type: String,
      required: true,
      enum: [
        'Supply Chain Management',
        'Vendor Development',
        'Procurement Strategy',
        'Six Sigma',
        'Logistics & Distribution',
        'Inventory Management',
        'ESG Services',
      ],
    },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String },
    howDidYouHear: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    bookingRef: { type: String, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Auto-generate booking reference before save
consultationSchema.pre('save', function (next) {
  if (!this.bookingRef) {
    this.bookingRef = Math.floor(100000 + Math.random() * 900000).toString();
  }
  next();
});

export default mongoose.model('Consultation', consultationSchema);
