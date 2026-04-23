// src/controllers/feedback.controller.js — Service page feedback (Rubric: Testing)
import Feedback from '../models/Feedback.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// POST /api/feedback — Public: submit feedback from service page
export const submitFeedback = asyncHandler(async (req, res) => {
  const { page, pageTitle, rating, comment, userEmail, userName } = req.body;

  if (!page || !rating) {
    return res.status(400).json({ success: false, message: 'Page and rating are required.' });
  }

  const feedback = await Feedback.create({
    page, pageTitle, rating, comment, userEmail, userName,
    userId: req.user?._id,
  });

  res.status(201).json({ success: true, message: 'Thank you for your feedback!', feedback });
});

// GET /api/feedback — Admin: all feedback with stats
export const getAllFeedback = asyncHandler(async (req, res) => {
  const { page: pageFilter } = req.query;
  const filter = pageFilter ? { page: pageFilter } : {};

  const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });

  // Calculate average ratings per page
  const pageStats = await Feedback.aggregate([
    { $group: { _id: '$page', avgRating: { $avg: '$rating' }, count: { $sum: 1 }, pageTitle: { $first: '$pageTitle' } } },
    { $sort: { count: -1 } },
  ]);

  res.json({ success: true, feedbacks, pageStats });
});

// POST /api/feedback/public — Public: get approved feedbacks for display
export const getApprovedFeedback = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({ isApproved: true })
    .sort({ createdAt: -1 })
    .limit(20)
    .select('-userEmail -userId');

  res.json({ success: true, feedbacks });
});
