import express from 'express';
import { uiController } from '@server/controllers/index.js';

const router = express.Router();

// User API
router.get('/page-state', uiController.getCurrentPageState);

export default router;
