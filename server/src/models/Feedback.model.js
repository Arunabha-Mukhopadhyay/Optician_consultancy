// src/models/Feedback.model.js — Service page feedback (Rubric: Testing)
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    page: { type: String, required: true }, // e.g., "supply-chain-management"
    pageTitle: { type: String }, // Human-readable page name
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    userEmail: { type: String, lowercase: true },
    userName: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);
