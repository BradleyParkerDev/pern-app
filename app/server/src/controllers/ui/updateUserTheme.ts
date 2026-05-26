import { Request, Response } from 'express';
import { createUiService, createAuthService } from '@server/services/index.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import { HTTPStatus } from '@shared/types/common/http/HTTPStatus.js';
import type { APIResponseType } from '@shared/types/common/api/ApiResponseType.js';

const updateUserTheme = async (req: Request, res: Response) => {
	const auth = createAuthService(req, res);
	const ui = createUiService(req, res);

	const { sessionId, userId, theme } = req.body;

	try {
		if (!userId && !sessionId) {
			auth.removeSessionCookie();
			loggerFactory.ui.info(
				`PUT - /api/ui/update-theme - missing identity - removing session cookie.`,
			);
			const response: APIResponseType<null> = {
				success: false,
				message: 'Missing user or session identity.',
				statusCode: HTTPStatus.UNAUTHORIZED,
				data: null,
			};
			res.status(HTTPStatus.UNAUTHORIZED).json(response);
			return;
		}
		const updatedTheme = await ui.updateTheme();
		if (!updatedTheme) {
			const response: APIResponseType<null> = {
				success: false,
				message: 'Theme update failed or missing theme.',
				statusCode: HTTPStatus.BAD_REQUEST,
				data: null,
			};
			res.status(HTTPStatus.BAD_REQUEST).json(response);
			return;
		}

		const identity = userId ? `user:${userId}` : `session:${sessionId}`;

		loggerFactory.ui.info(
			`PUT - /api/ui/update-theme - ${identity} - theme: ${theme}`,
		);
		const response: APIResponseType<{ theme: string }> = {
			success: true,
			message: 'Theme updated successfully.',
			statusCode: HTTPStatus.OK,
			data: { theme: updatedTheme },
		};
		res.status(HTTPStatus.OK).json(response);
	} catch (err) {
		loggerFactory.ui.error(
			`PUT - /api/ui/update-theme - error: ${
				err instanceof Error ? err.message : String(err)
			}`,
		);

		if (!res.headersSent) {
			const response: APIResponseType<null> = {
				success: false,
				message: 'Failed to update theme.',
				statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
				data: null,
			};

			res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
		}
	}
};

export default updateUserTheme;
