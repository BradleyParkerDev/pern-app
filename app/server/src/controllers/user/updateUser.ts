import { Request, Response } from 'express';
import { createAuthService } from '@server/services/auth/authService.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import dotenv from 'dotenv';

import {
	type APIResponseType,
	HTTPStatus,
} from '@shared/types/common/index.js';

dotenv.config();

const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const auth = createAuthService(req, res);
		const userUpdates = req.body;

		const result = await auth.user.updateUserData(userUpdates);

		if (result.success) {
			const response: APIResponseType<null> = {
				success: true,
				message: 'User has been successfully updated!',
				statusCode: HTTPStatus.OK,
				data: null,
			};

			res.status(HTTPStatus.OK).json(response);

			loggerFactory.user.info(
				`PUT - /api/user/update-user - userId: ${userUpdates.userId}`,
			);
			return;
		}

		let statusCode: number = HTTPStatus.INTERNAL_SERVER_ERROR;

		if (result.reason === 'missing_user_id') {
			statusCode = HTTPStatus.UNAUTHORIZED;
		} else if (
			result.reason === 'missing_current_password' ||
			result.reason === 'missing_password_confirmation' ||
			result.reason === 'password_mismatch' ||
			result.reason === 'invalid_current_password' ||
			result.reason === 'no_updates_provided'
		) {
			statusCode = HTTPStatus.BAD_REQUEST;
		} else if (result.reason === 'not_found') {
			statusCode = HTTPStatus.NOT_FOUND;
		}

		const response: APIResponseType<null> = {
			success: false,
			message: result.message,
			statusCode,
			data: null,
		};

		res.status(statusCode).json(response);
		return;
	} catch (error) {
		loggerFactory.user.error(
			`PUT - /api/user/update-user - error: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);

		const response: APIResponseType<null> = {
			success: false,
			message: 'Failed to update user.',
			statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
			data: null,
		};

		res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
	}
};

export default updateUser;
