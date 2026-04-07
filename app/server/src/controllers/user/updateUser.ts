import { Request, Response } from 'express';
import { createAuthService } from '@server/services/auth/authService.js';
import { loggerFactory } from '@server/lib/logger/index.js';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const updateUser = async (req: Request, res: Response): Promise<void> => {
	const auth = createAuthService(req, res);
	const userUpdates = req.body;
	const updatedUser = await auth.user.updateUserData(userUpdates);

	res.status(200).json({
		success: true,
		message: 'User has been successfully updated!',
		updatedUser,
	});
	loggerFactory.user.info(
		`PUT - /api/user/update-user - userId: ${userUpdates.userId}`,
	);

	return;
};

export default updateUser;
