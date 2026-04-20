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
import { userHelper, imageHelper, contentHelper } from '../index.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import { createStore } from '@shared/redux/store.js';
import type { PageContent, UserThemeType } from '@shared/types/common/index.js';

export const createPageContextHelper = (req?: Request, res?: Response) => {
	// Build the full request URL when Express request data is available.
	const url = req
		? `${req.protocol}://${req.get('host')}${req.originalUrl}`
		: '';

	// Extract only the pathname from a full URL.
	// Fallback to the raw input if URL parsing fails.
	const getPathOnly = (inputUrl: string) => {
		if (!inputUrl) return '';

		try {
			const parsed = new URL(inputUrl, 'http://localhost');
			return parsed.pathname || '/';
		} catch {
			return inputUrl;
		}
	};

	const normalizeRoutePath = (inputPath: string) => {
		const pathOnly = getPathOnly(inputPath).trim();

		if (!pathOnly) {
			return '/';
		}

		const normalizedPath = pathOnly.startsWith('/')
			? pathOnly
			: `/${pathOnly}`;

		if (normalizedPath === '/api/page-content') {
			return '/';
		}

		if (normalizedPath.startsWith('/api/page-content/')) {
			const pageContentPath = normalizedPath.replace(
				'/api/page-content',
				'',
			);
			return pageContentPath || '/';
		}

		return normalizedPath;
	};

	// Create a fresh Redux store for this request context.
	const store: AppStore = createStore();

	// Get the current route path without query parameters.
	const path = getPathOnly(url);

	const pageContextHelper = {
		// Raw request/response objects from Express.
		req,
		res,

		// Full URL and pathname for the current request.
		url,
		path,

		// Query params from the request.
		query: req?.query ?? {},

		// Per-request Redux store.
		store,

		// News helper for fetching page-specific news content.
		content: contentHelper,

		// Load app-wide and page-specific data into Redux for the current request.
		async loadAppDataIntoRedux(userTheme: UserThemeType) {
			const appName = process.env.UI_APP_NAME ?? '';
			const userId = this.req?.body?.userId;

			// Always load the selected theme into Redux first.
			this.store.dispatch(setTheme({ theme: userTheme }));

			// If a user ID exists on the request, attempt to load the user
			// and associated profile image into Redux.
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
					// User ID was present, but no matching user was found.
					this.store.dispatch(setAuth({ isAuth: false }));
				}
			} else {
				// No user ID on the request, so mark the session as unauthenticated.
				this.store.dispatch(setAuth({ isAuth: false }));
			}

			// Load app-level metadata.
			this.store.dispatch(setAppName({ appName }));

			// Resolve content for the current page/route.
			const pageContent = await this.getPageContent();

			// Store the current page state in Redux so the UI can hydrate from it.
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

		// Return content based on the current route path.
		async getPageContent(pathOverride?: string): Promise<PageContent> {
			const requestedPath =
				typeof pathOverride === 'string' && pathOverride.length > 0
					? pathOverride
					: typeof this.query.path === 'string' &&
						  this.query.path.length > 0
						? this.query.path
						: this.path;

			const resolvedPath = normalizeRoutePath(requestedPath);

			switch (resolvedPath) {
				case '/homepage-content':
					return await this.content.fetchHomePageContent();

				case '/chat':
					return await this.content.fetchChatPageContent();

				case '/friends':
					return await this.content.fetchFriendsPageContent();

				case '/images':
					return await this.content.fetchImagesPageContent();

				case '/news':
					return await this.content.fetchNewsPageContent();

				case '/userpage-content':
					return await this.content.fetchUserPageContent();

				case '/store':
					return await this.content.fetchStorePageContent();

				// Fallback for routes with no defined page content yet.
				default:
					return {};
			}
		},
	};

	return pageContextHelper;
};
