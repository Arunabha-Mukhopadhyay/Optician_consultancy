// src/app.js — Express application setup
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/error.middleware.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import consultationRoutes from './routes/consultation.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import esgRoutes from './routes/esg.routes.js';
import blogRoutes from './routes/blog.routes.js';
import caseStudyRoutes from './routes/caseStudy.routes.js';
import projectRoutes from './routes/project.routes.js';

const app = express();

// ── Middleware ──────────────────────────────────────────────────────────────
const allowedOrigins = [
  'https://optician-consultancy-2.onrender.com',
  'http://localhost:5173',   // Vite dev server
  'http://localhost:3000',
];


app.use(cors({
  origin(origin, callback) {
    // allow requests with no origin (curl, server-to-server, mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/esg', esgRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/projects', projectRoutes);

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'OptiChain API is running 🚀', timestamp: new Date().toISOString() });
});

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use(errorHandler);

export default app;
