import { Request, Response } from 'express';
import { generateUiService } from '@/server/src/services/ui/uiService.js';

const web = async (req: Request, res: Response) => {
	const ui = generateUiService(req, res);

	try {
		await ui.handlePageRendering();
	} catch (err) {
		console.error(err);
		if (!res.headersSent) res.status(500).send('SSR Failure');
	}
};

export default web;
