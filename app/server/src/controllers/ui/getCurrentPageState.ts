// import { Request, Response } from 'express';
// import { createUiService } from '@server/services/index.js';
// import { loggerFactory } from '@server/lib/logger/index.js';
// import { HTTPStatus } from '@shared/types/common/http/HTTPStatus.js';
// import type { APIResponseType } from '@shared/types/common/api/ApiResponseType.js';
// import type { PageContent } from '@shared/types/common/index.js';

// const getCurrentPageState = async (req: Request, res: Response) => {
// 	const ui = createUiService(req, res);
// 	const path = req.query.path;

// 	try {
// 		const currentPage: PageContent = await ui.page.getPageContent();

// 		const sessionId = req.body.sessionId ?? 'unknown';
// 		const userId = req.body.userId ?? 'guest';

// 		loggerFactory.ui.info(
// 			`GET - /api/ui/page-state - path: ${path} - sessionId: ${sessionId} - userId: ${userId}`,
// 		);

// 		const response: APIResponseType<PageContent> = {
// 			success: true,
// 			message: `User wants data from this path: ${path}`,
// 			statusCode: HTTPStatus.OK,
// 			data: currentPage,
// 		};

// 		res.status(HTTPStatus.OK).json(response);
// 	} catch (err) {
// 		loggerFactory.ui.error(
// 			`GET - /api/ui/page-state - error: ${
// 				err instanceof Error ? err.message : String(err)
// 			}`,
// 		);

// 		if (!res.headersSent) {
// 			const response: APIResponseType<null> = {
// 				success: false,
// 				message: 'Failed to get current page state.',
// 				statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
// 				data: null,
// 			};

// 			res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
// 		}
// 	}
// };

// export default getCurrentPageState;
