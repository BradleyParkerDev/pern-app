import { Request, Response } from 'express';
import { createAuthService } from '@server/services/auth/authService.js';
import { loggerFactory } from '@server/lib/logger/index.js';

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const auth = createAuthService(req, res);
		const userUpdates = req.body;

		const result = await auth.user.updateUserData(userUpdates);

		if (result.success) {
			res.status(200).json({
				success: true,
				message: 'User has been successfully updated!',
				updatedUser: result.updatedUser,
			});

			loggerFactory.user.info(
				`PUT - /api/user/update-user - userId: ${userUpdates.userId}`,
			);
			return;
		}

		if (result.reason === 'missing_user_id') {
			res.status(401).json(result);
			return;
		}

		if (
			result.reason === 'missing_current_password' ||
			result.reason === 'missing_password_confirmation' ||
			result.reason === 'password_mismatch' ||
			result.reason === 'invalid_current_password' ||
			result.reason === 'no_updates_provided'
		) {
			res.status(400).json(result);
			return;
		}

		if (result.reason === 'not_found') {
			res.status(404).json(result);
			return;
		}

		res.status(500).json({
			success: false,
			message: 'Unhandled update result.',
		});
		return;
	} catch (error) {
		loggerFactory.user.error(
			`PUT - /api/user/update-user - error: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);

		res.status(500).json({
			success: false,
			message: 'Failed to update user.',
		});
	}
};

export default updateUser;
