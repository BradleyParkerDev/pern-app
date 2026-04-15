// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { useLocation } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
// import {
// 	setTheme,
// 	handleUserFormToggle,
// 	loadCurrentPageState,
// 	toggleCurrentIsLoading,
// } from '@shared/redux/slices/ui/uiSlice.js';
// import { clientApiServices } from '@client/services/client/index.js';
// import confetti from 'canvas-confetti';

// export const useUIUtility = () => {
// 	const ui = useAppSelector((state) => state.ui);
// 	const { theme, appName, currentPage } = ui;

// 	const [navDrawerIsOpen, setNavDrawerIsOpen] = useState(false);
// 	const [showAvatarPopover, setShowAvatarPopover] = useState(false);

// 	const navigate = useNavigate();
// 	const dispatch = useAppDispatch();
// 	const location = useLocation();

// 	// Theme
// 	const toggleUserTheme = async () => {
// 		const nextTheme = theme === 'light' ? 'dark' : 'light';

// 		dispatch(
// 			setTheme({
// 				theme: nextTheme,
// 			}),
// 		);

// 		await clientApiServices.ui.toggleUserTheme(nextTheme);
// 	};

// 	// Nav
// 	const toggleNavbarDrawer = () => {
// 		setNavDrawerIsOpen((prev) => !prev);
// 		closeAvatarPopover();
// 	};
// 	const toggleAvatarPopover = () => {
// 		setShowAvatarPopover((prev) => !prev);
// 	};
// 	const closeAvatarPopover = () => {
// 		setShowAvatarPopover(false);
// 	};

// 	const navigateTo = (url: string, refresh?: boolean) => {
// 		if (refresh) {
// 			window.location.assign(url);
// 		} else {
// 			setNavDrawerIsOpen(false);
// 			closeAvatarPopover();
// 			navigate(url);
// 		}
// 	};

// 	useEffect(() => {
// 		const handleResize = () => {
// 			if (window.innerWidth <= 640) {
// 				closeAvatarPopover();
// 			}
// 		};

// 		handleResize();

// 		window.addEventListener('resize', handleResize);

// 		return () => {
// 			window.removeEventListener('resize', handleResize);
// 		};
// 	}, []);

// 	//Modals
// 	const toggleDeleteUserAccountModal = () => {};

// 	// User Forms
// 	const toggleUserFormsWithNavUserButton = () => {
// 		dispatch(
// 			handleUserFormToggle({
// 				userForm: ui.userForm === '' ? 'login' : '',
// 			}),
// 		);
// 	};

// 	// Confetti Effect
// 	const showConfettiEffect = () => {
// 		let myConfettiEffect = confetti({
// 			particleCount: 100,
// 			startVelocity: 30,
// 			spread: 360,
// 			origin: {
// 				x: Math.random(),
// 				// since they fall down, start a bit higher than random
// 				y: Math.random() - 0.2,
// 			},
// 		});

// 		myConfettiEffect;
// 	};

// 	// Fetch current page state
// 	useEffect(() => {
// 		// Skip client refetch on initial SSR hydration when state already matches.
// 		if (
// 			currentPage.path === location.pathname &&
// 			currentPage.isLoading === false
// 		) {
// 			return;
// 		}

// 		let isMounted = true;
// 		dispatch(toggleCurrentIsLoading({ currentPage: { isLoading: true } }));
// 		const path = location.pathname;

// 		const getPageData = async () => {
// 			try {
// 				const response =
// 					await clientApiServices.ui.fetchCurrentpageState(path);

// 				console.log(response);
// 				if (!isMounted) return;
// 				dispatch(
// 					loadCurrentPageState({
// 						currentPage: {
// 							path: path,
// 							content: response.content ?? {},
// 							isLoading: response.isLoading ?? false,
// 						},
// 					}),
// 				);
// 			} catch (error) {
// 				if (!isMounted) return;
// 				dispatch(
// 					loadCurrentPageState({
// 						currentPage: {
// 							path: path,
// 							content: {},
// 							isLoading: false,
// 						},
// 					}),
// 				);
// 			}
// 		};

// 		void getPageData();

// 		return () => {
// 			isMounted = false;
// 			dispatch(
// 				toggleCurrentIsLoading({
// 					currentPage: { isLoading: false },
// 				}),
// 			);
// 		};
// 	}, [location.key, location.pathname, dispatch]);

// 	return {
// 		appName,

// 		// Theme
// 		theme,
// 		toggleUserTheme,

// 		// Nav
// 		navDrawerIsOpen,
// 		showAvatarPopover,
// 		toggleNavbarDrawer,
// 		toggleAvatarPopover,
// 		closeAvatarPopover,
// 		navigateTo,

// 		//Modals

// 		// User Forms - '/user'
// 		userForm: ui.userForm,
// 		toggleUserFormsWithNavUserButton,

// 		// Effects
// 		showConfettiEffect,
// 	};
// };

// export type UIUtility = ReturnType<typeof useUIUtility>;
import { useAppSelector } from '@shared/redux/hooks.js';
import {
	useUIThemeHelper,
	useUINavHelper,
	useUIFormHelper,
	useUIEffectHelper,
	useUIPageHelper,
} from './helpers/index.js';

export const useUIUtility = () => {
	const appName = useAppSelector((state) => state.ui.appName);

	const themeHelper = useUIThemeHelper();
	const navHelper = useUINavHelper();
	const formHelper = useUIFormHelper();

	useUIPageHelper();

	const effectHelper = useUIEffectHelper({
		closeAvatarPopover: navHelper.closeAvatarPopover,
	});

	return {
		appName,
		...themeHelper,
		...navHelper,
		...formHelper,
		...effectHelper,
	};
};

export type UIUtility = ReturnType<typeof useUIUtility>;
