import express from 'express';
const router = express.Router();
import logger from '@/server/src/lib/logger/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Dev API - for vite dev server
const VITE_PORT = Number(
	process.env.VITE_PORT || process.env.VITE_PORT || 4001,
);
router.get('/vite-alive', (req, res) => {
	logger.info(`[Vite] - Dev server pinged Express - VITE_PORT: ${VITE_PORT}`);
	res.json({ status: 'ok' });
});
export default router;
