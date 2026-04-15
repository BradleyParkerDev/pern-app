import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';

export const useUINavHelper = () => {
	const [navDrawerIsOpen, setNavDrawerIsOpen] = useState(false);
	const [showAvatarPopover, setShowAvatarPopover] = useState(false);

	const navigate = useNavigate();

	const closeAvatarPopover = useCallback(() => {
		setShowAvatarPopover(false);
	}, []);

	const toggleAvatarPopover = () => {
		setShowAvatarPopover((prev) => !prev);
	};

	const toggleNavbarDrawer = () => {
		setNavDrawerIsOpen((prev) => !prev);
		closeAvatarPopover();
	};

	const navigateTo = (url: string, refresh?: boolean) => {
		if (refresh) {
			window.location.assign(url);
			return;
		}

		setNavDrawerIsOpen(false);
		closeAvatarPopover();
		navigate(url);
	};

	// ✅ Move resize effect HERE
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 640) {
				closeAvatarPopover();
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [closeAvatarPopover]);

	return {
		navDrawerIsOpen,
		showAvatarPopover,
		toggleNavbarDrawer,
		toggleAvatarPopover,
		closeAvatarPopover,
		navigateTo,
	};
};
