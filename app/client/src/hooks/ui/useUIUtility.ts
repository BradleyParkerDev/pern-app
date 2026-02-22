import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import {
	toggleTheme as toggleThemeAction,
	handleUserFormToggle,
	handleAvatarPopoverClose,
	loadCurrentPageState,
	toggleCurrentIsLoading,
} from '@shared/redux/slices/ui/uiSlice.js';
import { clientApiServices } from '@client/services/client/index.js';
import { PageUnderContstruction } from './helpers/PageUnderContstruction.js';
import confetti from 'canvas-confetti';

export const useUIUtility = () => {
	const ui = useAppSelector((state) => state.ui);
	const { theme, appName, closeAvatarPopover, currentPage } = ui;

	const [navDrawerIsOpen, setNavDrawerIsOpen] = useState(false);
	const [showAvatarPopover, setShowAvatarPopover] = useState(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();

	// Theme
	const toggleUserTheme = () => {
		dispatch(
			toggleThemeAction({
				theme: ui.theme === 'light' ? 'dark' : 'light',
			}),
		);
	};

	// Nav
	const toggleNavbarDrawer = () => {
		setNavDrawerIsOpen((prev) => !prev);
		closeAvatarPopoverWithRedux();
	};
	const toggleNavAvatarPopover = () => {
		if (showAvatarPopover || closeAvatarPopover) {
			setShowAvatarPopover(false);
		} else {
			setShowAvatarPopover(true);
		}
	};
	const closeAvatarPopoverWithRedux = () => {
		dispatch(
			handleAvatarPopoverClose({
				closeAvatarPopover: true,
			}),
		);
	};
	const navigateTo = (url: string) => {
		setNavDrawerIsOpen(false);
		closeAvatarPopoverWithRedux();
		navigate(url);
	};

	// User Forms
	const toggleUserFormsWithNavUserButton = () => {
		dispatch(
			handleUserFormToggle({
				userForm: ui.userForm === '' ? 'login' : '',
			}),
		);
	};

	// Page Under Construction
	const ShowPageUnderConstruction = () => {
		return PageUnderContstruction;
	};

	// Confetti Effect
	const showConfettiEffect = () => {
		let myConfettiEffect = confetti({
			particleCount: 100,
			startVelocity: 30,
			spread: 360,
			origin: {
				x: Math.random(),
				// since they fall down, start a bit higher than random
				y: Math.random() - 0.2,
			},
		});

		myConfettiEffect;
	};

	// Close Avatar Popover
	useEffect(() => {
		if (closeAvatarPopover) {
			setShowAvatarPopover(false);
			dispatch(
				handleAvatarPopoverClose({
					closeAvatarPopover: false,
				}),
			);
		}
	}, [closeAvatarPopover]);

	// Fetch current page state
	useEffect(() => {
		// Skip client refetch on initial SSR hydration when state already matches.
		if (
			currentPage.url === location.pathname &&
			currentPage.isLoading === false
		) {
			return;
		}

		let isMounted = true;
		dispatch(toggleCurrentIsLoading({ currentPage: { isLoading: true } }));
		const url = location.pathname;

		const getPageData = async () => {
			try {
				const response =
					await clientApiServices.ui.fetchCurrentpageState(url);

				console.log(response);
				if (!isMounted) return;
				dispatch(
					loadCurrentPageState({
						currentPage: {
							url: url,
							content: response.content ?? {},
							isLoading: response.isLoading ?? false,
						},
					}),
				);
			} catch (error) {
				if (!isMounted) return;
				dispatch(
					loadCurrentPageState({
						currentPage: {
							url: url,
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
	}, [location.key, location.pathname, dispatch]);

	return {
		appName,

		// Theme
		theme,
		toggleUserTheme,

		// Nav
		navDrawerIsOpen,
		showAvatarPopover,
		toggleNavbarDrawer,
		toggleNavAvatarPopover,
		closeAvatarPopoverWithRedux,
		navigateTo,

		// User Forms - '/user'
		userForm: ui.userForm,
		toggleUserFormsWithNavUserButton,

		// Page Under Construction
		ShowPageUnderConstruction,

		// Effects
		showConfettiEffect,
	};
};

export type UIUtility = ReturnType<typeof useUIUtility>;
