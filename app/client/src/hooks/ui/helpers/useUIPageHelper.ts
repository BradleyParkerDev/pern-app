import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import {
	loadCurrentPageState,
	toggleCurrentIsLoading,
} from '@shared/redux/slices/ui/uiSlice.js';
import { clientApiServices } from '@client/services/client/index.js';

export const useUIPageHelper = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const currentPage = useAppSelector((state) => state.ui.currentPage);

	useEffect(() => {
		if (
			currentPage.path === location.pathname &&
			currentPage.isLoading === false
		) {
			return;
		}

		let isMounted = true;
		const path = location.pathname;

		dispatch(toggleCurrentIsLoading({ currentPage: { isLoading: true } }));

		const getPageData = async () => {
			try {
				const response =
					await clientApiServices.ui.fetchCurrentpageState(path);

				if (!isMounted) return;

				dispatch(
					loadCurrentPageState({
						currentPage: {
							path,
							content: response.content ?? {},
							isLoading: response.isLoading ?? false,
						},
					}),
				);
			} catch {
				if (!isMounted) return;

				dispatch(
					loadCurrentPageState({
						currentPage: {
							path,
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
			dispatch(
				toggleCurrentIsLoading({
					currentPage: { isLoading: false },
				}),
			);
		};
	}, [
		location.key,
		location.pathname,
		dispatch,
		currentPage.path,
		currentPage.isLoading,
	]);
};
