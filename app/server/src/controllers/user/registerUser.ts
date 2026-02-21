import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createAuthService } from '../../services/auth/authService.js';
import { UserRegistrationSchema } from '@shared/zod/user/userRegistrationSchema.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const registerUser = async (req: Request, res: Response): Promise<void> => {
	const userId = 1234;
	const auth = createAuthService();
	const parsed = UserRegistrationSchema.safeParse(req.body);
	if (!parsed.success) {
		res.status(400).json({
			success: false,
			message: 'Invalid registration data',
			errors: parsed.error.issues,
		});
		return;
	}

	try {
		const { confirmPassword, ...newUserData } = parsed.data;
		await auth.user.createUser(newUserData);
		res.status(201).json({
			success: true,
			message: 'User has successfully registered!',
		});
		loggerFactory.user.info(
			`POST - /api/user/register-user - userId: ${userId}`,
		);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : String(error);
		loggerFactory.user.error(
			`POST - /api/user/register-user - userId: ${userId} - ${errorMessage}`,
		);
		res.status(500).json({
			success: false,
			message: 'Failed to register user',
			...(process.env.NODE_ENV !== 'production' && {
				error: errorMessage,
			}),
		});
	}
};

export default registerUser;
