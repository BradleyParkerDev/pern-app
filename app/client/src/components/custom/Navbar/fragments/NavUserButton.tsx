import { UIUtility } from '@shared/types/client/UIUtility.js';
import { AuthUtility } from '@shared/types/client/AuthUtility.js';
import { UserUtility } from '@shared/types/client/UserUtility.js';

type NavUserButton = {
	ui: UIUtility;
	auth: AuthUtility;
	user: UserUtility;
};

export const NavUserButton = ({ ui, auth, user }: NavUserButton) => {
	return (
		<div
			onClick={() => {
				if (!auth.isAuth) {
					ui.toggleUserFormsWithNavUserButton();
					ui.navigateTo('/auth');
				} else {
					user.logout();
				}
			}}
			className="border-foreground/20 text-foreground hover:border-foreground/40 hover:bg-foreground/5 cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition"
		>
			{`${auth.isAuth ? 'Sign Out' : 'Sign In'}`}
		</div>
	);
};
