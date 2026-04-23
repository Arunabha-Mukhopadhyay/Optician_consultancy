// src/pages/ESGCalculator/Results.jsx — Score results with gauge charts + PDF
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RadialBarChart, RadialBar, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { getScoreLabel } from '../../utils/helpers';
import jsPDF from 'jspdf';

// Gauge chart for a single score
function GaugeChart({ score, label, color }) {
  const data = [
    { name: 'score', value: score, fill: color },
    { name: 'empty', value: 100 - score, fill: '#f3f4f6' },
  ];
  return (
    <div className="card text-center">
      <div className="relative w-40 h-40 mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%" cy="50%"
            innerRadius="60%" outerRadius="90%"
            startAngle={210} endAngle={-30}
            data={data}
          >
            <RadialBar dataKey="value" cornerRadius={6} background={{ fill: '#f3f4f6' }}>
              {data.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
            </RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>{score}</span>
          <span className="text-xs text-gray-400">/100</span>
        </div>
      </div>
      <h3 className="font-bold text-navy-700 dark:text-white mt-3 mb-1">{label}</h3>
      <span className={`badge ${getScoreLabel(score).bg} ${getScoreLabel(score).text} text-xs`}>
        {getScoreLabel(score).label}
      </span>
    </div>
  );
}

export default function ESGResults() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('esgResult');
    if (stored) setResult(JSON.parse(stored));
    else navigate('/esg-calculator');
  }, [navigate]);

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const { companyName, esgScore, scHealthScore, overallIndex, recommendations } = result;

    doc.setFontSize(20);
    doc.setTextColor(27, 58, 107);
    doc.text('OptiChain Consulting', 14, 20);

    doc.setFontSize(14);
    doc.setTextColor(232, 119, 34);
    doc.text('ESG & Supply Chain Health Score Report', 14, 30);

    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text(`Company: ${companyName}`, 14, 45);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 14, 53);

    doc.setFontSize(13);
    doc.setTextColor(27, 58, 107);
    doc.text('Your Scores', 14, 68);
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text(`ESG Score: ${esgScore}/100 — ${getScoreLabel(esgScore).label}`, 14, 78);
    doc.text(`SC Health Score: ${scHealthScore}/100 — ${getScoreLabel(scHealthScore).label}`, 14, 86);
    doc.text(`Overall OptiChain Index: ${overallIndex}/100 — ${getScoreLabel(overallIndex).label}`, 14, 94);

    doc.setFontSize(13);
    doc.setTextColor(27, 58, 107);
    doc.text('Top Recommendations', 14, 110);
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    let y = 120;
    recommendations?.forEach((rec, i) => {
      doc.setFont(undefined, 'bold');
      doc.text(`${i + 1}. ${rec.title}`, 14, y);
      doc.setFont(undefined, 'normal');
      const lines = doc.splitTextToSize(rec.description, 180);
      doc.text(lines, 14, y + 6);
      y += 6 + lines.length * 5 + 8;
    });

    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text('OptiChain Consulting | Pune, Maharashtra | info@optichain.in | www.optichain.in', 14, 285);

    doc.save(`OptiChain-ESG-Report-${companyName}.pdf`);
  };

  if (!result) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="badge-orange mb-3 inline-block">Results Ready</span>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-700 dark:text-white mb-2">
            {result.companyName}'s OptiChain Score Report
          </h1>
          <p className="text-gray-500">Industry: {result.industry} | {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>

        {/* 3 Gauge Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <GaugeChart score={result.esgScore} label="ESG Score" color="#22c55e" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
            <GaugeChart score={result.scHealthScore} label="Supply Chain Health" color="#3b82f6" />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <GaugeChart score={result.overallIndex} label="OptiChain Index" color="#E87722" />
          </motion.div>
        </div>

        {/* Score Legend */}
        <div className="card mb-10 flex flex-wrap justify-center gap-6 py-5">
          {[['🔴', '0–40', 'Critical'], ['🟡', '41–60', 'Needs Improvement'], ['🔵', '61–80', 'Good'], ['🟢', '81–100', 'Excellent']].map(([icon, range, label]) => (
            <div key={label} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{icon}</span>
              <span className="font-medium">{range}</span>
              <span>— {label}</span>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-6">
            🎯 Personalized Recommendations
          </h2>
          <div className="space-y-4">
            {result.recommendations?.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="card border-l-4 border-orange-500"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="badge-navy text-xs">{rec.category}</span>
                    <span className={`badge text-xs ${rec.priority === 'High' ? 'bg-red-100 text-red-700' : rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <span className="text-orange-500 font-semibold text-sm">{rec.impact}</span>
                </div>
                <h3 className="font-bold text-navy-700 dark:text-white mb-2">{rec.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{rec.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={downloadPDF}
            id="download-report-btn"
            className="btn-secondary flex items-center gap-2"
          >
            <FiDownload className="w-5 h-5" /> Download PDF Report
          </button>
          <Link
            to={`/contact?service=ESG Services&company=${encodeURIComponent(result.companyName)}`}
            className="btn-primary"
            id="book-esg-consultation-btn"
          >
            <FiCalendar className="w-5 h-5" /> Book ESG Consultation <FiArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/esg-calculator" className="text-orange-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Recalculate
          </Link>
        </div>
      </div>
    </div>
  );
}
