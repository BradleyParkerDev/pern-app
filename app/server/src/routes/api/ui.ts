import express from 'express';
import { uiController } from '@server/controllers/index.js';

const router = express.Router();

// User API
router.get('/get-page-state', uiController.getCurrentPageState);
router.put('/update-user-theme', uiController.updateUserTheme);
export default router;
