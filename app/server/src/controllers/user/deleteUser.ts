import { Request, Response } from 'express';
import { createAuthService } from '@server/services/auth/authService.js';
import { loggerFactory } from '@server/lib/logger/index.js';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const auth = createAuthService(req, res);
		const userDeletionData = req.body;

		const result = await auth.user.deleteUserData(userDeletionData);

		if (!result.success) {
			if (result.reason === 'missing_user_id') {
				res.status(401).json(result);
				return;
			}

			if (result.reason === 'missing_confirmation') {
				res.status(400).json(result);
				return;
			}

			if (result.reason === 'not_found') {
				res.status(404).json(result);
				return;
			}
		}

		auth.removeSessionCookie();

		res.status(200).json({
			success: true,
			message: 'User has been successfully deleted!',
		});

		loggerFactory.user.info(
			`DELETE - /api/user/delete-user - userId: ${userDeletionData.userId}`,
		);
		return;
	} catch (error) {
		loggerFactory.user.error(
			`DELETE - /api/user/delete-user - error: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);

		res.status(500).json({
			success: false,
			message: 'Failed to delete user.',
		});
		return;
	}
};

export default deleteUser;
