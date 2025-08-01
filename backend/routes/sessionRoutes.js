import express from 'express';
import {
  getPublicSessions,
  getUserSessions,
  getSingleSession,
  saveDraftSession,
  publishSession
} from '../controllers/sessionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route
router.get('/sessions', getPublicSessions);

// Protected routes
router.get('/my-sessions', authMiddleware, getUserSessions);
router.get('/my-sessions/:id', authMiddleware, getSingleSession);
router.post('/my-sessions/save-draft', authMiddleware, saveDraftSession);
router.post('/my-sessions/publish', authMiddleware, publishSession);

export default router;
