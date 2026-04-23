// src/routes/project.routes.js
import { Router } from 'express';
import { getMyProjects, getAllProjects, createProject, updateProject } from '../controllers/project.controller.js';
import { verifyJWT, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/my', verifyJWT, getMyProjects);
router.get('/', verifyJWT, isAdmin, getAllProjects);
router.post('/', verifyJWT, isAdmin, createProject);
router.put('/:id', verifyJWT, isAdmin, updateProject);

export default router;
