import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import reactHelper from '@server/services/helpers/react/reactHelper.js';

export const generateUiService = (req: Request, res: Response) => {
	const uiService = {
		req,
		res,
		react: reactHelper,

		async handlePageRendering() {
			const userId = 1234;
			// Use originalUrl so the matched route (e.g., /user) is preserved inside the router
			const url = `${this.req.protocol}://${this.req.get('host')}${this.req.originalUrl}`;

			if (this.react.streamHtml === 'true') {
				await this.react.renderAppToPipeableStream(url, this.req, res);
			} else {
				const html = await this.react.renderAppToString(
					url,
					this.req,
					res,
				);
				res.status(200).send(html);
			}

			// Skip noisy asset probes (favicon/devtools) and normalise trailing slashes.
			const ignored = new Set([
				'/favicon.ico',
				'/.well-known/appspecific/com.chrome.devtools.json',
			]);

			const pathToLog =
				this.req.originalUrl.replace(/\/+($|\?)/, '$1') || '/';
			if (!ignored.has(pathToLog)) {
				loggerFactory.index.info(
					`GET - ${pathToLog} - userId: ${userId}`,
				);
			}
		},
	};
	return uiService;
};
