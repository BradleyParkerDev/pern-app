import express from 'express';
const router = express.Router();
import { loggerFactory } from '@server/lib/logger/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Dev API - for vite dev server
const VITE_PORT = Number(
	process.env.VITE_PORT || process.env.VITE_PORT || 4001,
);
router.get('/vite-alive', (req, res) => {
	loggerFactory.ui.info(
		`[Vite] - Dev server pinged Express - VITE_PORT: ${VITE_PORT}`,
	);
	res.json({ status: 'ok' });
});
export default router;
