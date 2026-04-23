// src/models/Blog.model.js — Blog post schema
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ['Supply Chain', 'Six Sigma', 'ESG', 'Procurement', 'Industry Trends', 'Logistics', 'Inventory'],
    },
    content: { type: String, required: true }, // HTML from React Quill
    excerpt: { type: String },
    author: { type: String, default: 'OptiChain Team' },
    authorTitle: { type: String },
    coverImage: { type: String, default: '' },
    tags: [String],
    readTime: { type: Number, default: 5 }, // minutes
    publishedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate slug from title
blogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  next();
});

export default mongoose.model('Blog', blogSchema);
