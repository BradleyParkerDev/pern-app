import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createAuthService } from '@server/services/index.js';
import dotenv from 'dotenv';
import {
	type APIResponseType,
	type LoginCredentialsDataType,
	HTTPStatus,
} from '@shared/types/common/index.js';

dotenv.config();

const loginUser = async (req: Request, res: Response): Promise<void> => {
	const auth = createAuthService(req, res);

	const sessionId = req.body.sessionId;

	const userLoginCredentials: LoginCredentialsDataType = {
		userName: req.body.userName,
		emailAddress: req.body.emailAddress,
		password: req.body.password,
	};

	const foundUserData = await auth.user.getUserData(userLoginCredentials);

	if (!foundUserData) {
		const response: APIResponseType<null> = {
			success: false,
			message: 'Invalid username/email or password.',
			statusCode: HTTPStatus.UNAUTHORIZED,
			data: null,
		};

		res.status(HTTPStatus.UNAUTHORIZED).json(response);

		loggerFactory.auth.info('POST - /api/auth/login-user - user not found');
		return;
	}

	const passwordsMatch = await auth.util.validatePassword(
		userLoginCredentials.password,
		foundUserData.password,
	);

	if (!passwordsMatch) {
		const response: APIResponseType<null> = {
			success: false,
			message: 'Invalid username/email or password.',
			statusCode: HTTPStatus.UNAUTHORIZED,
			data: null,
		};

		res.status(HTTPStatus.UNAUTHORIZED).json(response);

		loggerFactory.auth.info('POST - /api/auth/login-user - bad password');
		return;
	}

	await auth.deleteUserSession(sessionId);
	await auth.createUserSession(foundUserData.userId);

	const response: APIResponseType<null> = {
		success: true,
		message: 'User has successfully logged in.',
		statusCode: HTTPStatus.OK,
		data: null,
	};

	res.status(HTTPStatus.OK).json(response);

	loggerFactory.auth.info(
		`POST - /api/auth/login-user - userId: ${foundUserData.userId}`,
	);
};

export default loginUser;
