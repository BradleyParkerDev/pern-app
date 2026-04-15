import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';
import { AuthUtility } from '@/shared/types/client/hooks/AuthUtility.js';
import { UserUtility } from '@/shared/types/client/hooks/UserUtility.js';
import { toast } from 'sonner';
type NavUserButton = {
	ui: UIUtility;
	auth: AuthUtility;
	user: UserUtility;
};

export const NavUserButton = ({ ui, auth, user }: NavUserButton) => {
	return (
		<div
			onClick={async () => {
				if (!auth.isAuth) {
					ui.toggleAuthPageFormsWithNavUserButton();
					ui.navigateTo('/auth');
					return;
				}

				try {
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
				} catch (error) {
					console.error('[LOGOUT ERROR]', error);
					toast.error('Something went wrong. Please try again.');
				}
			}}
			className="border-foreground/20 text-foreground hover:border-foreground/40 hover:bg-foreground/5 cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition"
		>
			{auth.isAuth ? 'Sign Out' : 'Sign In'}
		</div>
	);
};
