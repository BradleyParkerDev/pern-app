import { AuthUtility } from '@/shared/types/client/hooks/AuthUtility.js';
import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';
import { UserUtility } from '@/shared/types/client/hooks/UserUtility.js';
import { User as UserAccountIcon, Settings, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import {
	NavUserButton,
	NavLogo,
	MenuButton,
	UIThemeSwitch,
	NavDrawer,
	NavDrawerBackDrop,
	NavUserAvatar,
	NavUserAvatarFallback,
	NavUserAvatarImage,
} from './index.js';

type BarFragmentProps = {
	ui: UIUtility;
	auth: AuthUtility;
	user: UserUtility;
};

export const BarFragment = ({ ui, auth, user }: BarFragmentProps) => {
	const userInitials =
		`${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.trim() ||
		user.userName?.[0]?.toUpperCase() ||
		'U';

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
			<div
				onClick={(event) => {
					event.stopPropagation();
				}}
				className="bg-background border-foreground/40 absolute top-[60px] right-[-8px] z-5 w-[190px] rounded-[10px] border-[.5px] border-solid p-2"
			>
				<ul className="flex flex-col gap-1">
					{avatarPopoverItems.map(({ label, icon, path }) => (
						<li
							key={label}
							onClick={async () => {
								try {
									if (label == 'logout') {
										const result = await user.logout();

										if (!result?.success) {
											toast.error(
												result?.message ??
													'Something went wrong. Please try again.',
											);
											return;
										}

										toast.success(result.message);
										ui.navigateTo('/');
									} else {
										ui.navigateTo(path);
									}
								} catch (error) {
									console.error('[LOGOUT ERROR]', error);
									toast.error(
										'Something went wrong. Please try again.',
									);
								}
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
				onClick={(event) => {
					event.stopPropagation();
				}}
				id="bar-avatar-and-username"
				className="relative flex h-[50px] w-full items-center gap-3 rounded-[15px] text-lg font-semibold transition"
			>
				{ui.showAvatarPopover ? avatarPopover : ''}
				<span className="flex h-8 w-8 items-center justify-center">
					<NavUserAvatar
						onClick={() => {
							ui.toggleAvatarPopover();
						}}
						className="h-8 w-8 overflow-hidden rounded-lg"
					>
						<NavUserAvatarImage
							src={user.profileImageUrl || undefined}
							className="h-full w-full object-cover object-top"
						/>
						<NavUserAvatarFallback className="rounded-lg">
							{userInitials.toUpperCase()}
						</NavUserAvatarFallback>
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
						<NavUserButton ui={ui} auth={auth} user={user} />
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
			onClick={() => {
				ui.closeAvatarPopover();
			}}
		>
			{/* Drawer */}
			<NavDrawer ui={ui} auth={auth} user={user} />
			<NavDrawerBackDrop ui={ui} />

			{/* Bar Content */}
			{barContent}
		</div>
	);
};
