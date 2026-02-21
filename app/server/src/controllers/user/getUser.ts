import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const getUser = async (req: Request, res: Response): Promise<void> => {
	const userId = 1234;

	res.status(200).json({
		success: true,
		message: 'User data successfully retrived!',
	});
	loggerFactory.user.info(`GET - /api/user/get-user - userId: ${userId}`);

	return;
};

export default getUser;
