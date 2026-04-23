// src/middleware/auth.middleware.js — JWT verification + role guard
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// Verify JWT token from httpOnly cookie or Authorization header
export const verifyJWT = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please log in.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found. Please log in again.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
});

// Restrict to admin role only
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied. Admin only.' });
  }
  next();
};
