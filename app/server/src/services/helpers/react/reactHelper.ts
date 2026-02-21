import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { render } from 'client/entry-server.js';
import { createStore } from '@shared/redux/store.js';
import { generateHtmlStream } from './html/generateHtmlStream.js';
import { renderToString } from 'react-dom/server';
import { generateHtml } from './html/generateHtml.js';
import type { AppStore } from '@shared/types/server/redux/index.js';
import { setUser } from '@shared/redux/slices/user/userSlice.js';
import {
	setAppName,
	toggleTheme,
	loadCurrentPageState,
} from '@shared/redux/slices/ui/uiSlice.js';
import { setAuth } from '@shared/redux/slices/auth/authSlice.js';
import { userHelper } from '../user/userHelper.js';
// Load Environment Variables
dotenv.config();

// Load environment variables
dotenv.config();

const STREAM_HTML = process.env.STREAM_HTML || 'false';
const reactHelper = {
	streamHtml: STREAM_HTML,
	pathOnly(url: string) {
		if (!url) return '';
		try {
			const parsed = new URL(url, 'http://localhost');
			return parsed.pathname || '/';
		} catch {
			return url;
		}
	},
	async loadAppDataIntoRedux(
		store: AppStore,
		url: string,
		req?: Request, // Express request
		res?: Response,
	) {
		// console.log(url);
		const appName = process.env.UI_APP_NAME;
		const theme = 'light';
		const userId = req?.body?.userId;
		if (userId) {
			const user = await userHelper.getUserData({ userId: userId }); // fetch data on the server
			console.log(user?.userName);
			store.dispatch(setAuth({ isAuth: Boolean(user) })); // fill redux state on SSR

			store.dispatch(setUser({ userData: user ?? {} })); // fill redux state on SSR
		}

		store.dispatch(setAppName({ appName: appName })); // fill redux state on SSR

		store.dispatch(toggleTheme({ theme: theme })); // fill redux state on SSR
		store.dispatch(
			// Store path-only to avoid mismatches between SSR and client location.
			loadCurrentPageState({
				currentPage: {
					url: this.pathOnly(url),
					content: {},
					isLoading: false,
				},
			}),
		); // fill redux state on SSR

		loggerFactory.ui.info(
			`[REDUX] - loadAppDataIntoRedux - page: ${this.pathOnly(url)}`,
		);
	},

	async renderAppToPipeableStream(
		url: string,
		req: Request, // Express response
		res: Response,
	) {
		// 1) Load Redux store
		const store = createStore();
		await this.loadAppDataIntoRedux(store, url, req, res);

		// 2) SSR render
		const { app, routerContext, appState } = await render(url, store);

		// 3) Stream html
		let streamData = {
			res: res,
			app: app,
			routerContext: routerContext,
			appState: appState,
		};
		await generateHtmlStream(streamData);

		loggerFactory.ui.info(
			`[REACT] - renderAppToPipeableStream - page: ${url}`,
		);
	},
	async renderAppToString(
		url: string,
		req: Request, // Express response
		res: Response,
	) {
		// 1. Load Redux store
		const store = createStore();

		await this.loadAppDataIntoRedux(store, url, req, res);

		// 2. Perform SSR
		const { app, routerContext, appState } = await render(url, store);
		let htmlCreatedFromReactApp = renderToString(app);
		let html = generateHtml(
			htmlCreatedFromReactApp,
			routerContext,
			appState,
		);

		loggerFactory.ui.info(`[REACT] - renderAppToString - page: ${url}`);

		return html;
	},
};

export default reactHelper;
