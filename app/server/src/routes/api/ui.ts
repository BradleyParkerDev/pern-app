import express from 'express';
import { uiController } from '@server/controllers/index.js';

const router = express.Router();

// UI API
router.put('/update-user-theme', uiController.updateUserTheme);
export default router;
