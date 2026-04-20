import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createAuthService, createUiService } from '@server/services/index.js';
import dotenv from 'dotenv';
import {
	type APIResponseType,
	HTTPStatus,
} from '@shared/types/common/index.js';

dotenv.config();

const getNewsPageContent = async (
	req: Request,
	res: Response,
): Promise<void> => {
	createAuthService(req, res);
	const ui = createUiService(req, res);
	const path = req.query.path;
	const sessionId = req.body?.sessionId ?? 'unknown';

	const currentPage = await ui.page.getPageContent();

	const response: APIResponseType<typeof currentPage> = {
		success: true,
		message: `User wants data from this path: ${path}`,
		statusCode: HTTPStatus.OK,
		data: currentPage,
	};

	loggerFactory.content.info(
		`GET - ${req.originalUrl} - sessionId: ${sessionId}`,
	);

	res.status(HTTPStatus.OK).json(response);
};

export default getNewsPageContent;
