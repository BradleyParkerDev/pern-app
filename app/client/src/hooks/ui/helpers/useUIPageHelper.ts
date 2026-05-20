import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import {
	loadCurrentPageState,
	toggleCurrentPageIsLoading,
} from '@shared/redux/slices/ui/uiSlice.js';
import { clientApiServices } from '@client/services/client/index.js';

export const useUIPageHelper = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const currentPage = useAppSelector((state) => state.ui.currentPage);
	const userName = useAppSelector((state) => state.user.userName);

	useEffect(() => {
		const routePath = location.pathname;

		if (currentPage.path === routePath && currentPage.isLoading === false) {
			return;
		}

		let isMounted = true;

		const getApiPath = () => {
			if (routePath === '/') {
				return '/homepage-content';
			}

			if (routePath === `/user/${userName}`) {
				return '/userpage-content';
			}

			return routePath;
		};

		const getPageData = async () => {
			dispatch(
				toggleCurrentPageIsLoading({
					currentPage: { isLoading: true },
				}),
			);

			try {
				const apiPath = getApiPath();
				const pageContent =
					await clientApiServices.ui.fetchCurrentpageState(apiPath);

				if (!isMounted) return;

				console.log(pageContent);
				dispatch(
					loadCurrentPageState({
						currentPage: {
							path: routePath,
							content: pageContent,
							isLoading: false,
						},
					}),
				);
			} catch {
				if (!isMounted) return;

				dispatch(
					loadCurrentPageState({
						currentPage: {
							path: routePath,
							content: {},
							isLoading: false,
						},
					}),
				);
			}
		};

		void getPageData();

		return () => {
			isMounted = false;
		};
	}, [location.pathname, userName, dispatch]);
};
