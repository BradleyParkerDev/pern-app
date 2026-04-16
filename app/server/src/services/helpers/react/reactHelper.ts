import dotenv from 'dotenv';
import type { Response } from 'express';
import { render } from 'client/entry-server.js';
import { renderToString } from 'react-dom/server';

import { loggerFactory } from '@server/lib/logger/index.js';
import { generateHtml } from './html/generateHtml.js';
import { generateHtmlStream } from './html/generateHtmlStream.js';
import type { AppStore } from '@/shared/types/common/redux/index.js';

dotenv.config();

const STREAM_HTML = process.env.STREAM_HTML?.toLowerCase() === 'true';

export type ReactPageContextType = {
	url: string;
	path: string;
	store: AppStore;
	res?: Response;
};

export const reactHelper = {
	streamHtml: STREAM_HTML,

	async renderAppToPipeableStream(page: ReactPageContextType): Promise<void> {
		if (!page.res) {
			throw new Error(
				'Response object is required for renderAppToPipeableStream.',
			);
		}

		const start = Date.now();

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

		const duration = Date.now() - start;

		loggerFactory.uiService.info(
			`[SSR][STREAM] ${page.path} - ${duration}ms`,
		);
	},

	async renderAppToString(page: ReactPageContextType): Promise<string> {
		const start = Date.now();

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

		const duration = Date.now() - start;

		loggerFactory.uiService.info(
			`[SSR][STRING] ${page.path} - ${duration}ms`,
		);

		return html;
	},
};
