import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createAuthService } from '../../services/auth/authService.js';
import dotenv from 'dotenv';

dotenv.config();

const logoutUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const auth = createAuthService(req, res);

		const { sessionId, userId } = req.body;

		if (!sessionId) {
			res.status(400).json({
				success: false,
				message: 'Session ID is required to log out.',
			});
			return;
		}

		await auth.deleteUserSession(sessionId);
		auth.removeSessionCookie();
		auth.clearReqBody();

		// Create a fresh anonymous/guest session after logout, if desired.
		await auth.createUserSession();

		res.status(200).json({
			success: true,
			message: 'User has successfully logged out!',
		});

		loggerFactory.auth.info(
			`DELETE - /api/auth/logout-user - userId: ${userId ?? 'unknown'}`,
		);
		return;
	} catch (error) {
		loggerFactory.auth.error(
			`DELETE - /api/auth/logout-user - error: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);

		res.status(500).json({
			success: false,
			message: 'Failed to log out user.',
		});
	}
};

export default logoutUser;
