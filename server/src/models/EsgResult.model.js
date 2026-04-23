// src/models/EsgResult.model.js — ESG Calculator results schema
import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  category: String,
  priority: String,
  title: String,
  description: String,
  impact: String,
});

const esgResultSchema = new mongoose.Schema(
  {
    // Company info (step 1)
    companyName: { type: String, required: true },
    industry: { type: String },
    employeeCount: { type: String },
    revenueRange: { type: String },

    // Operations data (step 2)
    fleetSize: { type: Number },
    deliveryDistance: { type: Number },
    energy_kwh: { type: Number },
    water_kl: { type: Number },
    waste_tons: { type: Number },
    renewable_energy_pct: { type: Number },

    // Supply chain data (step 3)
    numSuppliers: { type: Number },
    local_suppliers_pct: { type: Number },
    supplier_audit_score: { type: Number },
    inventory_turnover: { type: Number },
    rejection_rate: { type: Number },
    training_hours: { type: Number },

    // Scores
    esgScore: { type: Number },
    scHealthScore: { type: Number },
    overallIndex: { type: Number },
    recommendations: [recommendationSchema],
    breakdown: { type: mongoose.Schema.Types.Mixed },

    // User association (optional)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userEmail: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('EsgResult', esgResultSchema);
