// src/models/CaseStudy.model.js — Case study schema
import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  label: String,
  value: String,
  icon: String,
});

const caseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    industry: {
      type: String,
      required: true,
      enum: ['Manufacturing', 'FMCG', 'Pharma', 'Retail', 'Logistics', 'Auto OEM'],
    },
    service: {
      type: String,
      required: true,
      enum: ['Supply Chain Management', 'Vendor Development', 'Procurement Strategy', 'Six Sigma', 'Logistics & Distribution', 'Inventory Management', 'ESG Services'],
    },
    clientBackground: { type: String },
    problem: { type: String, required: true },
    approach: { type: String }, // HTML content — 3 phases
    result: { type: String },
    metrics: [metricSchema],
    keyLearnings: [String],
    clientQuote: { type: String },
    coverImage: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

caseStudySchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
  }
  next();
});

export default mongoose.model('CaseStudy', caseStudySchema);
