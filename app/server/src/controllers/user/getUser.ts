import { Request, Response } from 'express';
import { createAuthService } from '../../services/auth/authService.js';
import { loggerFactory } from '@server/lib/logger/index.js';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const getUser = async (req: Request, res: Response): Promise<void> => {
	const auth = createAuthService(req, res);
	const userId = req.body.userId;
	const userData = await auth.user.getUserData({ userId: userId });

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
		message: 'User data successfully retrived!',
		user,
	});
	loggerFactory.user.info(
		`GET - /api/user/get-user - userId: ${userData?.userId}`,
	);

	return;
};

export default getUser;
