import { AuthUtility } from '@shared/types/client/AuthUtility.js';
import { UIUtility } from '@shared/types/client/UIUtility.js';
import { UserUtility } from '@shared/types/client/UserUtility.js';

import { MenuButton } from './MenuButton.js';
import { NavLogo } from './NavLogo.js';
import { UIThemeSwitch } from './UIThemeSwitch.js';
import { NavUserButton } from './NavUserButton.js';
import {
	NavUserAvatar,
	NavUserAvatarImage,
	NavUserAvatarFallback,
} from './NavUserAvatar.js';

import {
	MessageCircle as Chat,
	CameraIcon as Images,
	Contact as Friends,
	Newspaper as News,
	StoreIcon as Store,
	Settings,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

type NavDrawerProps = {
	ui: UIUtility;
	auth: AuthUtility;
	user: UserUtility;
};

const navItems = [
	{ label: 'Chat', icon: <Chat />, path: '/chat' },
	{ label: 'Friends', icon: <Friends />, path: '/friends' },
	{ label: 'Images', icon: <Images />, path: '/images' },
	{ label: 'News', icon: <News />, path: '/news' },
	{ label: 'Store', icon: <Store />, path: '/store' },
];

export const NavDrawer = ({ ui, auth, user }: NavDrawerProps) => {
	const isOpen = ui.navDrawerIsOpen;
	const drawerWidth = 300;
	const { pathname } = useLocation();

	const createNavDrawerHeader = () => {
		return (
			<div
				id="drawer-header"
				className={`flex items-center gap-3 px-4 py-3 transition-opacity duration-300 ${isOpen ? 'opacity-100 delay-150' : 'opacity-0'}`}
			>
				<MenuButton ui={ui} />
				<NavLogo ui={ui} />
			</div>
		);
	};

	const showUserAvatarAndUserName = () => {
		return (
			<div
				id="drawer-avatar-and-username"
				className={`transition-opacity duration-300 ${isOpen ? 'pointer-events-auto opacity-100 delay-150' : 'pointer-events-none opacity-0'} text-foreground hover:bg-foreground/5 w-full items-start gap-3 rounded-[15px] px-6 py-3 text-lg font-semibold sm:hidden`}
			>
				<div
					onClick={() => {
						ui.navigateTo(`/user/${user.userName}`);
					}}
					className="flex w-full items-center gap-3"
				>
					<span className="flex h-6 w-6 items-center justify-center">
						<NavUserAvatar className="h-8 w-8 rounded-lg">
							<NavUserAvatarImage
								src="https://github.com/evilrabbit.png"
								alt="@evilrabbit"
							/>
							<NavUserAvatarFallback>ER</NavUserAvatarFallback>
						</NavUserAvatar>
					</span>
					<p className="truncate">{`Hi, ${user.userName}`}</p>
				</div>
				<div
					onClick={() => {
						ui.navigateTo('/settings');
					}}
					className="flex w-full items-center gap-2 text-base font-medium"
				>
					<Settings className="h-5 w-5" />
					<p>Settings</p>
				</div>
			</div>
		);
	};

	const generateNavLinks = () => {
		return (
			<div
				id="nav-links"
				className={`transition-opacity duration-300 ${isOpen ? 'pointer-events-auto opacity-100 delay-150' : 'pointer-events-none opacity-0'}`}
			>
				<ul>
					{navItems.map(({ label, icon, path }) => (
						<li
							key={label}
							onClick={() => {
								ui.navigateTo(path);
							}}
							className={`${pathname.startsWith(path) ? 'bg-muted' : ''} text-foreground hover:bg-foreground/5 flex h-[50px] w-full items-center justify-start gap-3 rounded-[15px] px-6 text-lg font-semibold dark:hover:bg-[#171717]`}
						>
							<span className="flex h-6 w-6 items-center justify-center">
								{icon}
							</span>
							{label}
						</li>
					))}
				</ul>
			</div>
		);
	};

	const createNavDrawerFooter = () => {
		return (
			<div
				id="drawer-footer"
				className={`border-foreground/10 mt-6 flex w-full flex-col gap-4 border-t px-4 py-4 transition-opacity duration-300 sm:border-t-0 ${isOpen ? 'opacity-100 delay-150' : 'opacity-0'} `}
			>
				<div className="text-foreground flex w-full items-center justify-between text-sm font-semibold sm:hidden">
					<p>Appearance</p>
					<UIThemeSwitch onClick={ui.toggleUserTheme} />
				</div>
				<div className="flex w-full justify-center sm:hidden">
					<NavUserButton ui={ui} auth={auth} user={user} />
				</div>
			</div>
		);
	};

	const navDrawerHeader = createNavDrawerHeader();
	const userAvatarAndUserName = showUserAvatarAndUserName();
	const navLinks = generateNavLinks();
	const navDrawerFooter = createNavDrawerFooter();

	return (
		<div
			id="drawer-content"
			aria-hidden={!isOpen}
			style={{
				width: isOpen ? drawerWidth : 0,
			}}
			className={`bg-background absolute top-0 left-0 z-30 mt-[-.5px] -ml-px h-screen min-h-full overflow-x-hidden ${isOpen ? `dark:shadow-[8px_0_24px_-12px_rgba(255,255,255,0.1)]` : ``} transition-all duration-150 ease-out`}
		>
			{navDrawerHeader}
			{auth.isAuth && userAvatarAndUserName}
			{navLinks}
			{navDrawerFooter}
		</div>
	);
};
