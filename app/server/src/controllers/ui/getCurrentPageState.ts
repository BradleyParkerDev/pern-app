import { Request, Response } from 'express';
import { createUiService } from '@server/services/ui/uiService.js';
import { resolve } from 'path';
const getCurrentPageState = async (req: Request, res: Response) => {
	const ui = createUiService(req, res);
	const path = req.query.path;

	const currentPage = await ui.page.getPageContent();

	const message = `User wants data from this path: ${path}`;
	try {
		res.send({
			success: 'true',
			message,
			currentPage,
		});
	} catch (err) {
		console.error(err);
	}
};

export default getCurrentPageState;
