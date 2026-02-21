import { UIUtility } from '@shared/types/client/UIUtility.js';

type NavbarDrawerBackDropProps = {
	ui: UIUtility;
};

export const NavDrawerBackDrop = ({ ui }: NavbarDrawerBackDropProps) => {
	const isOpen = ui.navDrawerIsOpen;

	return (
		<div
			onClick={() => {
				ui.toggleNavbarDrawer();
			}}
			aria-hidden={!isOpen}
			id="nav-backdrop"
			className={`absolute inset-0 top-0 left-0 z-20 h-screen min-h-full w-full bg-black/10 backdrop-blur-md transition-opacity duration-350 ease-out ${
				isOpen
					? 'pointer-events-auto opacity-100'
					: 'pointer-events-none opacity-0'
			}`}
		/>
	);
};
