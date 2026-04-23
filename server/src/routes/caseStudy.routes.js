// src/routes/caseStudy.routes.js
import { Router } from 'express';
import { getCaseStudies, getCaseStudy, createCaseStudy, updateCaseStudy, deleteCaseStudy } from '../controllers/caseStudy.controller.js';
import { verifyJWT, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getCaseStudies);
router.get('/:id', getCaseStudy);
router.post('/', verifyJWT, isAdmin, createCaseStudy);
router.put('/:id', verifyJWT, isAdmin, updateCaseStudy);
router.delete('/:id', verifyJWT, isAdmin, deleteCaseStudy);

export default router;
