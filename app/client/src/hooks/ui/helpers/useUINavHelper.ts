import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export const useUINavHelper = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [navDrawerIsOpen, setNavDrawerIsOpen] = useState(false);
	const [showAvatarPopover, setShowAvatarPopover] = useState(false);
	const [pageLocation, setPageLocation] = useState(location.pathname);

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
		window.scrollTo(0, 0);
	};

	// Close popover when page changes or window is <= 640px
	useEffect(() => {
		const handlePageChange = () => {
			if (pageLocation !== location.pathname) {
				closeAvatarPopover();
				setPageLocation(location.pathname);
			}
		};
		const handleResize = () => {
			if (window.innerWidth <= 640) {
				closeAvatarPopover();
			}
		};

		handlePageChange();
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [location.pathname, location.search, closeAvatarPopover]);

	return {
		navDrawerIsOpen,
		showAvatarPopover,
		toggleNavbarDrawer,
		toggleAvatarPopover,
		closeAvatarPopover,
		navigateTo,
	};
};
