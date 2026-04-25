// src/routes/auth.routes.js
import { Router } from 'express';
import { register, login, logout, getMe, getAllUsers } from '../controllers/auth.controller.js';
import { verifyJWT, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', verifyJWT, getMe);
router.get('/users', verifyJWT, isAdmin, getAllUsers);

export default router;
