// src/controllers/caseStudy.controller.js — Case Study CRUD
import CaseStudy from '../models/CaseStudy.model.js';
import asyncHandler from '../utils/asyncHandler.js';

// GET /api/case-studies — Public: list (with filters)
export const getCaseStudies = asyncHandler(async (req, res) => {
  const { industry, service } = req.query;
  const filter = {};
  if (industry) filter.industry = industry;
  if (service) filter.service = service;

  const caseStudies = await CaseStudy.find(filter).sort({ publishedAt: -1 });
  res.json({ success: true, caseStudies });
});

// GET /api/case-studies/:id — Public: single
export const getCaseStudy = asyncHandler(async (req, res) => {
  const caseStudy = await CaseStudy.findOne({
    $or: [{ _id: req.params.id }, { slug: req.params.id }],
  });
  if (!caseStudy) return res.status(404).json({ success: false, message: 'Case study not found.' });
  res.json({ success: true, caseStudy });
});

// POST /api/case-studies — Admin
export const createCaseStudy = asyncHandler(async (req, res) => {
  const cs = await CaseStudy.create(req.body);
  res.status(201).json({ success: true, caseStudy: cs });
});

// PUT /api/case-studies/:id — Admin
export const updateCaseStudy = asyncHandler(async (req, res) => {
  const cs = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!cs) return res.status(404).json({ success: false, message: 'Case study not found.' });
  res.json({ success: true, caseStudy: cs });
});

// DELETE /api/case-studies/:id — Admin
export const deleteCaseStudy = asyncHandler(async (req, res) => {
  const cs = await CaseStudy.findByIdAndDelete(req.params.id);
  if (!cs) return res.status(404).json({ success: false, message: 'Case study not found.' });
  res.json({ success: true, message: 'Case study deleted.' });
});
