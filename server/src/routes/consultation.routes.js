// src/routes/consultation.routes.js
import { Router } from 'express';
import {
  createConsultation, getAllConsultations, getMyConsultations,
  updateConsultationStatus, deleteConsultation,
} from '../controllers/consultation.controller.js';
import { verifyJWT, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', createConsultation);                                     // public
router.get('/', verifyJWT, isAdmin, getAllConsultations);                  // admin
router.get('/my', verifyJWT, getMyConsultations);                         // client
router.put('/:id', verifyJWT, isAdmin, updateConsultationStatus);         // admin
router.delete('/:id', verifyJWT, isAdmin, deleteConsultation);            // admin

export default router;
