// src/controllers/esg.controller.js — ESG Calculator (Standout Feature)
import EsgResult from '../models/EsgResult.model.js';
import { calculateESGScore } from '../utils/esgScoring.js';
import asyncHandler from '../utils/asyncHandler.js';

// POST /api/esg/calculate — Public: calculate + save result
export const calculateAndSave = asyncHandler(async (req, res) => {
  const {
    companyName, industry, employeeCount, revenueRange,
    fleetSize, deliveryDistance, energy_kwh, water_kl, waste_tons, renewable_energy_pct,
    numSuppliers, local_suppliers_pct, supplier_audit_score, inventory_turnover, rejection_rate, training_hours,
  } = req.body;

  // Run scoring algorithm
  const scores = calculateESGScore({
    renewable_energy_pct: parseFloat(renewable_energy_pct) || 0,
    waste_tons: parseFloat(waste_tons) || 0,
    energy_kwh: parseFloat(energy_kwh) || 0,
    water_kl: parseFloat(water_kl) || 0,
    supplier_audit_score: parseFloat(supplier_audit_score) || 5,
    inventory_turnover: parseFloat(inventory_turnover) || 4,
    rejection_rate: parseFloat(rejection_rate) || 10,
    training_hours: parseFloat(training_hours) || 20,
    local_suppliers_pct: parseFloat(local_suppliers_pct) || 30,
  });

  // Save to DB
  const result = await EsgResult.create({
    companyName, industry, employeeCount, revenueRange,
    fleetSize, deliveryDistance, energy_kwh, water_kl, waste_tons, renewable_energy_pct,
    numSuppliers, local_suppliers_pct, supplier_audit_score, inventory_turnover, rejection_rate, training_hours,
    ...scores,
    userId: req.user?._id,
    userEmail: req.user?.email || req.body.email,
  });

  res.status(201).json({ success: true, result });
});

// GET /api/esg/results — Admin: all results
export const getAllResults = asyncHandler(async (req, res) => {
  const results = await EsgResult.find().sort({ createdAt: -1 }).limit(100);
  res.json({ success: true, results });
});

// GET /api/esg/my-results — Client: own results
export const getMyResults = asyncHandler(async (req, res) => {
  const results = await EsgResult.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, results });
});
