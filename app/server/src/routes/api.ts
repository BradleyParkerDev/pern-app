import dotenv from 'dotenv';

import express from 'express';

import authRouter from './api/auth.js';
import imageRouter from './api/image.js';
import userRouter from './api/user.js';
import uiRouter from './api/ui.js';
import devRouter from './api/dev/index.js';

// Load environment variables
dotenv.config();

const router = express.Router();
router.use('/auth', authRouter);
router.use('/image', imageRouter);
router.use('/user', userRouter);
router.use('/ui', uiRouter);

// Logs to server.log when vite dev server hits it
if (process.env.NODE_ENV === 'development') {
	router.use('/dev', devRouter);
}

export default router;
