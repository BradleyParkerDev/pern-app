import { AuthUtility } from '@shared/types/client/AuthUtility.js';
import { UIUtility } from '@shared/types/client/UIUtility.js';
import { UserUtility } from '@shared/types/client/UserUtility.js';
import { useState } from 'react';
import { User as UserAccountIcon, Settings, LogOut } from 'lucide-react';
import {
	NavUserButton,
	NavLogo,
	MenuButton,
	UIThemeSwitch,
	NavDrawer,
	NavDrawerBackDrop,
	NavUserAvatar,
	NavUserAvatarImage,
	NavUserAvatarFallback,
} from './index.js';

type BarFragmentProps = {
	ui: UIUtility;
	auth: AuthUtility;
	user: UserUtility;
};

export const BarFragment = ({ ui, auth, user }: BarFragmentProps) => {
	const avatarPopoverItems = [
		{
			label: 'User Account',
			icon: <UserAccountIcon />,
			path: `/user/${user.userName}`,
		},
		{ label: 'Settings', icon: <Settings />, path: '/settings' },
		{ label: 'logout', icon: <LogOut />, path: '/' },
	];
	const generateUserAvatarPopover = () => {
		return (
			<div className="bg-background border-foreground/40 absolute top-[60px] right-[-8px] z-5 w-[190px] rounded-[10px] border-[.5px] border-solid p-2">
				<ul className="flex flex-col gap-1">
					{avatarPopoverItems.map(({ label, icon, path }) => (
						<li
							key={label}
							onClick={() => {
								ui.navigateTo(path);
							}}
							className={`text-foreground hover:bg-foreground/5 flex w-full items-center justify-start gap-3 rounded-[12px] px-4 py-2 text-left text-[14px] dark:hover:bg-[#171717]`}
						>
							<span className="flex h-6 w-6 items-center justify-start">
								{icon}
							</span>
							{label}
						</li>
					))}
				</ul>
			</div>
		);
	};

	const showUserAvatarAndUserName = () => {
		const avatarPopover = generateUserAvatarPopover();

		return (
			<div
				id="bar-avatar-and-username"
				className="relative flex h-[50px] w-full items-center gap-3 rounded-[15px] text-lg font-semibold transition"
			>
				{ui.showAvatarPopover ? avatarPopover : ''}
				<span className="flex h-6 w-6 items-center justify-center">
					<NavUserAvatar
						onClick={() => {
							ui.toggleNavAvatarPopover();
						}}
						className="h-8 w-8 rounded-lg"
					>
						<NavUserAvatarImage
							src="https://github.com/evilrabbit.png"
							alt="@evilrabbit"
						/>
						<NavUserAvatarFallback>ER</NavUserAvatarFallback>
					</NavUserAvatar>
				</span>
			</div>
		);
	};

	const generateNavBarContent = () => {
		const userAvatarAndUserName = showUserAvatarAndUserName();
		return (
			<div
				id="bar-content"
				className="flex h-full w-full items-center justify-between px-3 sm:px-5"
			>
				<div id="bar-left" className="flex h-full items-center gap-3">
					<MenuButton ui={ui} />
					<NavLogo ui={ui} />
				</div>
				<div
					id="bar-right"
					className="hidden h-full items-center gap-4 sm:visible sm:flex"
				>
					<UIThemeSwitch onClick={ui.toggleUserTheme} />

					{auth.isAuth ? (
						userAvatarAndUserName
					) : (
						<NavUserButton ui={ui} auth={auth} />
					)}
				</div>
			</div>
		);
	};

	const barContent = generateNavBarContent();
	return (
		<div
			id="bar-root"
			className="bg-background relative top-0 z-10 h-16 w-full"
		>
			{/* Drawer */}
			<NavDrawer ui={ui} auth={auth} user={user} />
			<NavDrawerBackDrop ui={ui} />

			{/* Bar Content */}
			{barContent}
		</div>
	);
};
