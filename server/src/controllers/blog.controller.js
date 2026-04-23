// src/controllers/blog.controller.js — Blog CRUD
import Blog from '../models/Blog.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/blogs — Public: list (with category/search filter)
export const getBlogs = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const filter = { isPublished: true };
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const total = await Blog.countDocuments(filter);
  const blogs = await Blog.find(filter)
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .select('-content');

  res.json({ success: true, total, blogs });
});

// GET /api/blogs/:slug — Public: single post
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOneAndUpdate(
    { slug: req.params.slug, isPublished: true },
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found.' });
  res.json({ success: true, blog });
});

// POST /api/blogs — Admin: create
export const createBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({ success: true, blog });
});

// PUT /api/blogs/:id — Admin: update
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!blog) return res.status(404).json({ success: false, message: 'Blog not found.' });
  res.json({ success: true, blog });
});

// DELETE /api/blogs/:id — Admin
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) return res.status(404).json({ success: false, message: 'Blog not found.' });
  res.json({ success: true, message: 'Blog deleted.' });
});
