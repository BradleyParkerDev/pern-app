import { UIUtility } from '@shared/types/client/UIUtility.js';
import { AuthUtility } from '@shared/types/client/AuthUtility.js';

type NavUserButton = {
	ui: UIUtility;
	auth: AuthUtility;
};

export const NavUserButton = ({ ui, auth }: NavUserButton) => {
	return (
		<div
			onClick={() => {
				if (!auth.isAuth) {
					ui.toggleUserFormsWithNavUserButton();
					ui.navigateTo('/auth');
				}
			}}
			className="border-foreground/20 text-foreground hover:border-foreground/40 hover:bg-foreground/5 cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition"
		>
			{`${auth.isAuth ? 'Sign Out' : 'Sign In'}`}
		</div>
	);
};
