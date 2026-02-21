import express from 'express';
const router = express.Router();
import { webController } from '@server/controllers/index.js';

// Web
router.get('*', webController.web);

export default router;
