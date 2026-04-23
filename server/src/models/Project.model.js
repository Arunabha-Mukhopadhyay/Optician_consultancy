// src/models/Project.model.js — Client project tracking schema
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  name: String,
  fileUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    service: { type: String },
    status: {
      type: String,
      enum: ['planning', 'ongoing', 'review', 'completed'],
      default: 'planning',
    },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    reports: [reportSchema],
    startDate: { type: Date },
    endDate: { type: Date },
    nextMeeting: { type: Date },
    consultantName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
