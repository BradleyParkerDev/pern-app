import { Request, Response } from 'express';
import { createAuthService } from '@server/services/auth/authService.js';
import { loggerFactory } from '@server/lib/logger/index.js';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const auth = createAuthService(req, res);
		const userId = req.body?.userId;

		if (!userId) {
			res.status(401).json({
				success: false,
				message: 'Not authenticated.',
			});
			return;
		}

		const deletedUser = await auth.user.deleteUserData(userId);

		if (!deletedUser || deletedUser.length === 0) {
			res.status(404).json({
				success: false,
				message: 'User not found.',
			});
			return;
		}

		auth.removeSessionCookie();

		res.status(200).json({
			success: true,
			message: 'User has been successfully deleted!',
		});
		loggerFactory.user.info(
			`DELETE - /api/user/delete-user - userId: ${userId}`,
		);

		return;
	} catch (error) {
		loggerFactory.user.error(
			`DELETE - /api/user/delete-user - error: ${error instanceof Error ? error.message : String(error)}`,
		);
		res.status(500).json({
			success: false,
			message: 'Failed to delete user.',
		});
		return;
	}
};

export default deleteUser;
