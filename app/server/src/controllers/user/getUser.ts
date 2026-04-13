import { Request, Response } from 'express';
import { createAuthService } from '@server/services/auth/authService.js';
import { createUiService } from '@server/services/ui/uiService.js';
import { loggerFactory } from '@server/lib/logger/index.js';

import dotenv from 'dotenv';

dotenv.config();

const getUser = async (req: Request, res: Response): Promise<void> => {
	const auth = createAuthService(req, res);
	const ui = createUiService(req, res);

	const theme = await ui.getUserTheme();
	const userId = req.body.userId;
	const userData = await auth.user.getUserData({ userId });

	const user = {
		firstName: userData?.firstName,
		lastName: userData?.lastName,
		emailAddress: userData?.emailAddress,
		userName: userData?.userName,
	};

	console.log(userData);
	console.log(user);

	res.status(200).json({
		success: true,
		message: 'User data successfully retrieved!',
		user,
		theme,
	});

	loggerFactory.user.info(
		`GET - /api/user/get-user - userId: ${userData?.userId}`,
	);
};

export default getUser;
