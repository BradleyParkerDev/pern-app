import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createAuthService } from '../../services/auth/authService.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const logoutUser = async (req: Request, res: Response): Promise<void> => {
	const auth = createAuthService(req, res);

	const sessionId = req.body.sessionId;
	console.log(req.body);
	const userId = req.body.userId;
	if (sessionId) {
		await auth.deleteUserSession(sessionId);
		await auth.removeSessionCookie();
		await auth.clearReqBody();

		res.status(200).json({
			success: true,
			message: 'User has successfully logged out!',
		});

		loggerFactory.auth.info(
			`DELETE - /api/auth/logout-user - userId: ${userId}`,
		);

		return;
	}

	res.status(200).json({
		success: false,
		message: 'User is not logged out.',
	});
};

export default logoutUser;
