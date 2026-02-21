import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const updateUser = async (req: Request, res: Response): Promise<void> => {
	const userId = 1234;

	res.status(200).json({
		success: true,
		message: 'User has been successfully updated!',
	});
	loggerFactory.user.info(`PUT - /api/user/update-user - userId: ${userId}`);

	return;
};

export default updateUser;
