// src/controllers/auth.controller.js — Auth logic (register, login, logout, me)
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import asyncHandler from '../utils/asyncHandler.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// POST /api/auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, company, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ success: false, message: 'Email already registered.' });
  }

  const user = await User.create({ name, email, password, company, phone });
  const token = generateToken(user._id);

  res.cookie('token', token, cookieOptions);
  res.status(201).json({ success: true, message: 'Account created successfully.', user, token });
});

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);

  // Remove password from response
  const userObj = user.toJSON();
  res.json({ success: true, message: 'Login successful.', user: userObj, token });
});

// POST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', cookieOptions);
  res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

// GET /api/auth/users — Admin: get all users for dropdowns
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'client' }).select('name email company').sort({ createdAt: -1 });
  res.json({ success: true, users });
});
