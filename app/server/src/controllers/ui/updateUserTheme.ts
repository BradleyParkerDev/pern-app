import { Request, Response } from 'express';
import { createUiService } from '@server/services/ui/uiService.js';

const updateUserTheme = async (req: Request, res: Response) => {
	const ui = createUiService(req, res);

	const response = await ui.updateTheme();
};

export default updateUserTheme;
