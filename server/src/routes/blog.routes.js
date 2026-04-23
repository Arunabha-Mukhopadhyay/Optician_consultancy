// src/routes/blog.routes.js
import { Router } from 'express';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blog.controller.js';
import { verifyJWT, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', verifyJWT, isAdmin, createBlog);
router.put('/:id', verifyJWT, isAdmin, updateBlog);
router.delete('/:id', verifyJWT, isAdmin, deleteBlog);

export default router;
