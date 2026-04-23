// src/controllers/project.controller.js — Client project tracking
import Project from '../models/Project.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/projects/my — Client: own projects
export const getMyProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ clientId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, projects });
});

// GET /api/projects — Admin: all projects
export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate('clientId', 'name email company').sort({ createdAt: -1 });
  res.json({ success: true, projects });
});

// POST /api/projects — Admin: create project for client
export const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, project });
});

// PUT /api/projects/:id — Admin: update
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
  res.json({ success: true, project });
});
