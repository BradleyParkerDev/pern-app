import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import reactHelper from '@server/services/helpers/react/reactHelper.js';
import { createPageContextHelper } from '../helpers/pageContext/pageContextHelper.js';
import { type UserThemeType } from '@shared/types/common/UserThemeType.js';
// import { UserTheme } from '@server/database/schemas/UserThemes.js';
import { db } from '@server/database/db.js';
export const createUiService = (req: Request, res: Response) => {
	const page = createPageContextHelper(req, res);

	const uiService = {
		req,
		res,
		page,
		react: reactHelper,

		async handlePageRendering() {
			await this.page.loadAppDataIntoRedux();

			if (this.react.streamHtml) {
				await this.react.renderAppToPipeableStream(this.page);
			} else {
				const html = await this.react.renderAppToString(this.page);
				this.res.status(200).send(html);
			}

			const ignored = new Set([
				'/favicon.ico',
				'/.well-known/appspecific/com.chrome.devtools.json',
			]);

			const pathToLog =
				this.req.originalUrl.replace(/\/+($|\?)/, '$1') || '/';

			if (!ignored.has(pathToLog)) {
				loggerFactory.index.info(
					`GET - ${pathToLog} - userId: ${this.req.body.userId}`,
				);
			}
		},
		async updateTheme() {
			const theme: UserThemeType = req.body.theme;
			const sessionId = req.body.sessionId;
			const userId = req.body.userId;
			console.log(theme);
			if (userId) {
			}

			// if (userId === '' && sessionId !== '') {
			// 	const response = await db.select();
			// }
		},
	};

	return uiService;
};
