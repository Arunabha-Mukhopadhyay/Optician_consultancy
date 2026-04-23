// src/routes/feedback.routes.js
import { Router } from 'express';
import { submitFeedback, getAllFeedback, getApprovedFeedback } from '../controllers/feedback.controller.js';
import { verifyJWT, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', submitFeedback);                          // public — submit feedback
router.post('/public', getApprovedFeedback);               // public — get approved feedbacks
router.get('/', verifyJWT, isAdmin, getAllFeedback);       // admin

export default router;
