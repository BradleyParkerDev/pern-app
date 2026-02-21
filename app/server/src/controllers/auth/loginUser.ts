import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createAuthService } from '@server/services/auth/authService.js';
import dotenv from 'dotenv';
import { LoginCredentials } from '@shared/types/server/zod/LoginCredentials.js';

// Load environment variables
dotenv.config();

const loginUser = async (req: Request, res: Response): Promise<void> => {
	const auth = createAuthService(req, res);

	const userLoginCredentials: LoginCredentials = {
		userName: req.body.userName,
		emailAddress: req.body.emailAddress,
		password: req.body.password,
	};

	const foundUserData = await auth.user.getUserData(userLoginCredentials);
	if (!foundUserData) {
		res.status(401).json({
			success: false,
			message: 'Invalid username/email or password.',
		});
		loggerFactory.auth.info('POST - /api/auth/login-user - user not found');
		return;
	}

	const passwordsMatch = await auth.util.validatePassword(
		userLoginCredentials.password,
		foundUserData.password,
	);

	if (!passwordsMatch) {
		res.status(401).json({
			success: false,
			message: 'Invalid username/email or password.',
		});
		loggerFactory.auth.info('POST - /api/auth/login-user - bad password');
		return;
	}

	await auth.createUserSession(foundUserData.userId);

	const userId = 1234;

	res.status(200).json({
		success: true,
		message: 'User has successfully logged in!',
	});
	loggerFactory.auth.info(`POST - /api/auth/login-user - userId: ${userId}`);

	return;
};

export default loginUser;
