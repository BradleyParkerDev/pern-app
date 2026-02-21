import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@client/components/custom/Navbar/Navbar.js';
import {
	useUIUtility,
	useAuthUtility,
	useUserUtility,
} from '@client/hooks/index.js';

const Layout = () => {
	const auth = useAuthUtility();
	const ui = useUIUtility();
	const user = useUserUtility();

	const skull3 = '/assets/Skull3.jpg';

	// Apply layout classes to the document body safely on the client.
	useEffect(() => {
		const bodyClasses = [
			ui.theme,
			'bg-background',
			'flex',
			'justify-center',
		];

		document.body.classList.add(...bodyClasses);

		return () => {
			document.body.classList.remove(...bodyClasses);
		};
	}, [ui.theme]);

	// Lock outer document scroll when the navbar drawer is open.
	useEffect(() => {
		const previousHtmlOverflow = document.documentElement.style.overflow;
		if (ui.navDrawerIsOpen) {
			document.documentElement.style.overflow = 'hidden';
		} else {
			document.documentElement.style.overflow = previousHtmlOverflow;
		}
		return () => {
			document.documentElement.style.overflow = previousHtmlOverflow;
		};
	}, [ui.navDrawerIsOpen]);

	return (
		<div
			id="container"
			className={`relative min-h-dvh w-screen max-w-[1400px] ${ui.navDrawerIsOpen ? 'shadow-lg dark:shadow-white/5' : ''}`}
		>
			<Navbar ui={ui} auth={auth} user={user} />
			<div id="content" className={`min-h-[calc(100dvh-4rem)] w-full`}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
