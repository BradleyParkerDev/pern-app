import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	const userId = 1234;

	res.status(200).json({
		success: true,
		message: 'User has been successfully deleted!',
	});
	loggerFactory.user.info(
		`DELETE - /api/user/delete-user - userId: ${userId}`,
	);

	return;
};

export default deleteUser;
