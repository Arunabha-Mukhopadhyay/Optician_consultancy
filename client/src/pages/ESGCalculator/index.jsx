// src/pages/ESGCalculator/index.jsx — 3-Step ESG & Supply Chain Health Score Tool
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import api from '../../utils/axios';
import toast from 'react-hot-toast';

const steps = [
  { id: 1, title: 'Company Info', desc: 'Tell us about your organization' },
  { id: 2, title: 'Operations Data', desc: 'Environmental metrics' },
  { id: 3, title: 'Supply Chain Data', desc: 'Supplier & process metrics' },
];

export default function ESGCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onStepSubmit = async (data) => {
    const merged = { ...formData, ...data };
    if (currentStep < 3) {
      setFormData(merged);
      setCurrentStep(currentStep + 1);
    } else {
      // Final step — call API
      setLoading(true);
      try {
        const { data: res } = await api.post('/esg/calculate', merged);
        if (res.success) {
          toast.success('Score calculated! Viewing your results...');
          // Store result in sessionStorage for Results page
          sessionStorage.setItem('esgResult', JSON.stringify(res.result));
          navigate('/esg-calculator/results');
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Calculation failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="badge-orange mb-3 inline-block">🌿 Standout Feature</span>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-700 dark:text-white mb-3">
            ESG & Supply Chain Health Score Tool
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete our 3-step diagnostic to receive your personalized ESG Score, Supply Chain Health Score, and OptiChain Index — with actionable recommendations.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, i) => (
              <div key={step.id} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    currentStep > step.id ? 'bg-green-500 text-white' :
                    currentStep === step.id ? 'bg-navy-700 text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {currentStep > step.id ? <FiCheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <span className="text-xs font-medium mt-1 text-gray-600 dark:text-gray-400 hidden sm:block">{step.title}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-colors ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">Step {currentStep} of 3: {steps[currentStep - 1].desc}</p>
        </div>

        {/* Form Card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit(onStepSubmit)} className="card space-y-6">
                <h2 className="text-xl font-bold text-navy-700 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
                  Step {currentStep}: {steps[currentStep - 1].title}
                </h2>

                {/* STEP 1 — Company Info */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="label">Company Name *</label>
                      <input id="company-name" {...register('companyName', { required: 'Required' })} className="input" placeholder="Sharma Industries Pvt. Ltd." />
                      {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
                    </div>
                    <div>
                      <label className="label">Industry *</label>
                      <select id="industry" {...register('industry', { required: 'Required' })} className="input">
                        <option value="">Select Industry</option>
                        {['Manufacturing', 'FMCG', 'Pharma', 'Retail', 'Logistics', 'Auto OEM', 'Other'].map(i => <option key={i}>{i}</option>)}
                      </select>
                      {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry.message}</p>}
                    </div>
                    <div>
                      <label className="label">Employee Count</label>
                      <select id="employee-count" {...register('employeeCount')} className="input">
                        <option value="">Select Range</option>
                        {['1–50', '51–200', '201–500', '501–1000', '1000+'].map(r => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Annual Revenue Range</label>
                      <select id="revenue-range" {...register('revenueRange')} className="input">
                        <option value="">Select Range</option>
                        {['< ₹1 Cr', '₹1–10 Cr', '₹10–50 Cr', '₹50–200 Cr', '> ₹200 Cr'].map(r => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 2 — Operations Data */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Fleet Size (vehicles)</label>
                      <input id="fleet-size" type="number" {...register('fleetSize')} className="input" placeholder="12" min="0" />
                    </div>
                    <div>
                      <label className="label">Avg. Delivery Distance / Month (km)</label>
                      <input id="delivery-distance" type="number" {...register('deliveryDistance')} className="input" placeholder="5001" min="0" />
                    </div>
                    <div>
                      <label className="label">Energy Consumption (kWh/month) *</label>
                      <input id="energy-kwh" type="number" {...register('energy_kwh', { required: 'Required' })} className="input" placeholder="3500" min="0" />
                      {errors.energy_kwh && <p className="text-red-500 text-xs mt-1">{errors.energy_kwh.message}</p>}
                    </div>
                    <div>
                      <label className="label">Water Usage (kL/month) *</label>
                      <input id="water-kl" type="number" {...register('water_kl', { required: 'Required' })} className="input" placeholder="200" min="0" />
                      {errors.water_kl && <p className="text-red-500 text-xs mt-1">{errors.water_kl.message}</p>}
                    </div>
                    <div>
                      <label className="label">Waste Generated (tons/month) *</label>
                      <input id="waste-tons" type="number" {...register('waste_tons', { required: 'Required' })} className="input" placeholder="5" min="0" />
                      {errors.waste_tons && <p className="text-red-500 text-xs mt-1">{errors.waste_tons.message}</p>}
                    </div>
                    <div>
                      <label className="label">% Renewable Energy Used *</label>
                      <input id="renewable-pct" type="number" {...register('renewable_energy_pct', { required: 'Required', min: 0, max: 100 })} className="input" placeholder="15" min="0" max="100" />
                      {errors.renewable_energy_pct && <p className="text-red-500 text-xs mt-1">{errors.renewable_energy_pct.message}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 3 — Supply Chain Data */}
                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Number of Active Suppliers *</label>
                      <input id="num-suppliers" type="number" {...register('numSuppliers', { required: 'Required' })} className="input" placeholder="25" min="1" />
                      {errors.numSuppliers && <p className="text-red-500 text-xs mt-1">{errors.numSuppliers.message}</p>}
                    </div>
                    <div>
                      <label className="label">% Local / Domestic Suppliers</label>
                      <input id="local-suppliers-pct" type="number" {...register('local_suppliers_pct')} className="input" placeholder="70" min="0" max="100" />
                    </div>
                    <div>
                      <label className="label">Avg. Supplier Audit Score (1–10) *</label>
                      <input id="supplier-audit" type="number" {...register('supplier_audit_score', { required: 'Required', min: 1, max: 10 })} className="input" placeholder="7" min="1" max="10" step="0.1" />
                      {errors.supplier_audit_score && <p className="text-red-500 text-xs mt-1">{errors.supplier_audit_score.message}</p>}
                    </div>
                    <div>
                      <label className="label">Inventory Turnover Ratio *</label>
                      <input id="inventory-turnover" type="number" {...register('inventory_turnover', { required: 'Required' })} className="input" placeholder="8" min="0" step="0.1" />
                      {errors.inventory_turnover && <p className="text-red-500 text-xs mt-1">{errors.inventory_turnover.message}</p>}
                    </div>
                    <div>
                      <label className="label">Return / Rejection Rate (%) *</label>
                      <input id="rejection-rate" type="number" {...register('rejection_rate', { required: 'Required' })} className="input" placeholder="3" min="0" max="100" step="0.1" />
                      {errors.rejection_rate && <p className="text-red-500 text-xs mt-1">{errors.rejection_rate.message}</p>}
                    </div>
                    <div>
                      <label className="label">Employee Training Hours / Year</label>
                      <input id="training-hours" type="number" {...register('training_hours')} className="input" placeholder="40" min="0" />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  {currentStep > 1 ? (
                    <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="btn-secondary" id="prev-step-btn">
                      <FiArrowLeft className="w-4 h-4" /> Previous
                    </button>
                  ) : <div />}

                  <button
                    type="submit"
                    disabled={loading}
                    id={currentStep === 3 ? 'calculate-score-btn' : `next-step-${currentStep}-btn`}
                    className="btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Calculating...' : currentStep === 3 ? '🔢 Calculate My Scores' : <>Next Step <FiArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>

          {/* Info banner */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-gray-700">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>📊 How scoring works:</strong> Your ESG Score is calculated from renewable energy usage, waste generation, and resource consumption. Supply Chain Health Score measures supplier quality, inventory efficiency, and team capability. Results are saved to your account for future comparison.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
