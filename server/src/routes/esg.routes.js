// src/routes/esg.routes.js
import { Router } from 'express';
import { calculateAndSave, getAllResults, getMyResults } from '../controllers/esg.controller.js';
import { verifyJWT, isAdmin, optionalAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/calculate', optionalAuth, calculateAndSave);     // public but attach user if logged in
router.get('/results', verifyJWT, isAdmin, getAllResults);     // admin
router.get('/my-results', verifyJWT, getMyResults);           // client

export default router;
