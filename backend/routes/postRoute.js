import express from 'express';
import { createPost, getAllPosts, getUserPosts, getPostById } from '../controllers/postController.js';
import authMiddleware from '../middleware/auth.js';

const postRouter = express.Router();


postRouter.post('/create', authMiddleware, createPost);
postRouter.get('/user/:userId', authMiddleware, getUserPosts);
postRouter.get('/all', getAllPosts);
postRouter.get('/:id', getPostById);

export default postRouter;