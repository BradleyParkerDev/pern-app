import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createAuthService } from '../../services/auth/authService.js';
import { RegistrationSchema } from '@/shared/zod/user/registrationSchema.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const registerUser = async (req: Request, res: Response): Promise<void> => {
	const auth = createAuthService();
	const parsed = RegistrationSchema.safeParse(req.body);

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
		const result = await auth.user.createUser(newUserData);

		if (!result.success) {
			if (
				result.reason === 'duplicate_email' ||
				result.reason === 'duplicate_username'
			) {
				res.status(409).json(result);
				return;
			}

			res.status(500).json(result);
			return;
		}

		res.status(201).json({
			success: true,
			message: 'User has successfully registered!',
		});

		loggerFactory.user.info(
			`POST - /api/user/register-user - userId: ${result.createdUser.userId}`,
		);
		return;
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : String(error);

		loggerFactory.user.error(
			`POST - /api/user/register-user - error: - ${errorMessage}`,
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
