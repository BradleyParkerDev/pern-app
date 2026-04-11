import { Request, Response } from 'express';
import type { AppStore } from '@shared/types/server/redux/index.js';
import { setUser } from '@shared/redux/slices/user/userSlice.js';
import {
	setAppName,
	loadCurrentPageState,
} from '@shared/redux/slices/ui/uiSlice.js';
import { setAuth } from '@shared/redux/slices/auth/authSlice.js';
import { userHelper } from '../user/userHelper.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createStore } from '@shared/redux/store.js';

export const createPageContextHelper = (req?: Request, res?: Response) => {
	const url = `${req?.protocol}://${req?.get('host')}${req?.originalUrl}`;

	const getPathOnly = (inputUrl: string) => {
		if (!inputUrl) return '';
		try {
			const parsed = new URL(inputUrl, 'http://localhost');
			return parsed.pathname || '/';
		} catch {
			return inputUrl;
		}
	};

	const store: AppStore = createStore();
	const path = getPathOnly(url);

	const pageContextHelper = {
		req,
		res,
		url,
		path,
		query: req?.query ?? {},
		store,

		async loadAppDataIntoRedux() {
			const appName = process.env.UI_APP_NAME;
			const theme = 'light';
			const userId = this.req?.body?.userId;

			if (userId) {
				const user = await userHelper.getUserData({ userId });

				if (user) {
					this.store.dispatch(setAuth({ isAuth: true }));
					this.store.dispatch(setUser({ userData: user }));
				} else {
					this.store.dispatch(setAuth({ isAuth: false }));
				}
			}

			this.store.dispatch(setAppName({ appName }));

			// Replace with setTheme if possible.
			// this.store.dispatch(setTheme({ theme }));

			const pageContent = await this.getPageContent();

			this.store.dispatch(
				loadCurrentPageState({
					currentPage: {
						path: this.path,
						content: pageContent,
						isLoading: false,
					},
				}),
			);

			loggerFactory.ui.info(
				`[REDUX] - loadAppDataIntoRedux - page: ${this.path}`,
			);
		},

		async getPageContent() {
			switch (this.path) {
				case '/':
					return {};
				default:
					return {};
			}
		},
	};

	return pageContextHelper;
};
