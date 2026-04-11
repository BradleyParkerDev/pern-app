import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import reactHelper from '@server/services/helpers/react/reactHelper.js';
import { createPageContextHelper } from '../helpers/pageContext/pageContextHelper.js';

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
	};

	return uiService;
};
