import dotenv from 'dotenv';
import type { Response } from 'express';
import { render } from 'client/entry-server.js';
import { renderToString } from 'react-dom/server';

import { loggerFactory } from '@server/lib/logger/index.js';
import { generateHtml } from './html/generateHtml.js';
import { generateHtmlStream } from './html/generateHtmlStream.js';
import type { AppStore } from '@shared/types/server/redux/index.js';

// Load environment variables
dotenv.config();

const STREAM_HTML = process.env.STREAM_HTML === 'true';

export type ReactPageContextType = {
	url: string;
	path: string;
	store: AppStore;
	res?: Response;
};

const reactHelper = {
	streamHtml: STREAM_HTML,

	async renderAppToPipeableStream(page: ReactPageContextType): Promise<void> {
		if (!page.res) {
			throw new Error(
				'Response object is required for renderAppToPipeableStream.',
			);
		}

		const { app, routerContext, appState } = await render(
			page.url,
			page.store,
		);

		await generateHtmlStream({
			res: page.res,
			app,
			routerContext,
			appState,
		});

		loggerFactory.ui.info(
			`[REACT] - renderAppToPipeableStream - page: ${page.path}`,
		);
	},

	async renderAppToString(page: ReactPageContextType): Promise<string> {
		const { app, routerContext, appState } = await render(
			page.url,
			page.store,
		);

		const htmlCreatedFromReactApp = renderToString(app);

		const html = generateHtml(
			htmlCreatedFromReactApp,
			routerContext,
			appState,
		);

		loggerFactory.ui.info(
			`[REACT] - renderAppToString - page: ${page.path}`,
		);

		return html;
	},
};

export default reactHelper;
