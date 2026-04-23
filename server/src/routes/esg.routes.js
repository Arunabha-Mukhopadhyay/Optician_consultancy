// src/routes/esg.routes.js
import { Router } from 'express';
import { calculateAndSave, getAllResults, getMyResults } from '../controllers/esg.controller.js';
import { verifyJWT, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/calculate', calculateAndSave);                   // public
router.get('/results', verifyJWT, isAdmin, getAllResults);     // admin
router.get('/my-results', verifyJWT, getMyResults);           // client

export default router;
