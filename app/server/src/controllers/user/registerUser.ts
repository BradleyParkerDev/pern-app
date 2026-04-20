import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createAuthService } from '@server/services/index.js';
import { RegistrationSchema } from '@/shared/zod/user/registrationSchema.js';
import dotenv from 'dotenv';

import {
	type APIResponseType,
	HTTPStatus,
} from '@shared/types/common/index.js';

dotenv.config();

const registerUser = async (req: Request, res: Response): Promise<void> => {
	const auth = createAuthService();
	const parsed = RegistrationSchema.safeParse(req.body);

	if (!parsed.success) {
		const response: APIResponseType<null> = {
			success: false,
			message: 'Invalid registration data.',
			statusCode: HTTPStatus.BAD_REQUEST,
			data: null,
		};

		res.status(HTTPStatus.BAD_REQUEST).json(response);
		return;
	}

	try {
		const { confirmPassword, ...newUserData } = parsed.data;
		const result = await auth.user.createUser(newUserData);

		if (!result.success) {
			let statusCode: number = HTTPStatus.INTERNAL_SERVER_ERROR;

			if (
				result.reason === 'duplicate_email' ||
				result.reason === 'duplicate_username'
			) {
				statusCode = HTTPStatus.CONFLICT;
			}

			const response: APIResponseType<null> = {
				success: false,
				message: result.message,
				statusCode,
				data: null,
			};

			res.status(statusCode).json(response);
			return;
		}

		const response: APIResponseType<null> = {
			success: true,
			message: 'User has successfully registered!',
			statusCode: HTTPStatus.CREATED,
			data: null,
		};

		res.status(HTTPStatus.CREATED).json(response);

		loggerFactory.user.info(
			`POST - /api/user/register-user - userId: ${result.createdUser.userId}`,
		);
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : String(error);

		loggerFactory.user.error(
			`POST - /api/user/register-user - error: - ${errorMessage}`,
		);

		const response: APIResponseType<null> = {
			success: false,
			message: 'Failed to register user.',
			statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
			data: null,
		};

		res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
	}
};

export default registerUser;
