import { Request, Response } from 'express';
import type { AppStore } from '@/shared/types/common/redux/index.js';
import { setUser } from '@shared/redux/slices/user/userSlice.js';
import { setUserProfileImage } from '@shared/redux/slices/image/imageSlice.js';
import {
	setAppName,
	setTheme,
	loadCurrentPageState,
} from '@shared/redux/slices/ui/uiSlice.js';
import { setAuth } from '@shared/redux/slices/auth/authSlice.js';
import { userHelper } from '../user/userHelper.js';
import { imageHelper } from '../image/imageHelper.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createStore } from '@shared/redux/store.js';
import type { UserThemeType } from '@shared/types/common/UserThemeType.js';

export const createPageContextHelper = (req?: Request, res?: Response) => {
	const url = req
		? `${req.protocol}://${req.get('host')}${req.originalUrl}`
		: '';

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

		async loadAppDataIntoRedux(userTheme: UserThemeType) {
			const appName = process.env.UI_APP_NAME ?? '';
			const userId = this.req?.body?.userId;

			this.store.dispatch(setTheme({ theme: userTheme }));

			if (userId) {
				const user = await userHelper.getUserData({ userId });

				if (user) {
					const userProfileImage =
						await imageHelper.getUserProfileImage(userId);

					this.store.dispatch(setAuth({ isAuth: true }));
					this.store.dispatch(setUser({ userData: user }));
					this.store.dispatch(
						setUserProfileImage({
							profileImageUrl: userProfileImage?.imageUrl ?? null,
							profileImageKey: userProfileImage?.imageKey ?? null,
						}),
					);
				} else {
					this.store.dispatch(setAuth({ isAuth: false }));
				}
			} else {
				this.store.dispatch(setAuth({ isAuth: false }));
			}

			this.store.dispatch(setAppName({ appName }));

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

			loggerFactory.uiService.info(
				`[REDUX] loadAppDataIntoRedux - page: ${this.path}`,
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
