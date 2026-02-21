import { UIUtility } from '@shared/types/client/UIUtility.js';

type NavLogoProps = {
	ui: UIUtility;
};

export const NavLogo = ({ ui }: NavLogoProps) => {
	return (
		<div
			id="nav-logo"
			onClick={() => ui.navigateTo('/')}
			className="text-foreground cursor-pointer text-lg font-semibold tracking-tight transition hover:opacity-80"
		>
			{ui.appName === '' ? 'Logo' : ui.appName}
		</div>
	);
};
