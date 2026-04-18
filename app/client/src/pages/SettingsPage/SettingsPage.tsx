import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import {
	DeleteUserDataForm,
	UserInfoCard,
	UpdateUserForm,
	UpdateUserPasswordForm,
	StatusCard,
} from '@client/components/index.js';
import { Button } from '@client/components/shadcn/button.js';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@client/components/custom/dialog/dialog.js';
import { Lock } from 'lucide-react';

const SettingsPage = () => {
	const { ui, auth } = useOutletContext<AppOutletContext>();

	useEffect(() => {
		document.title = `Settings | ${ui.appName}`;
	}, []);

	return (
		<div className="mx-auto w-full max-w-2xl space-y-10 px-4 py-6">
			{!auth.isAuth && (
				<StatusCard
					ui={ui}
					icon={<Lock className="h-5 w-5" />}
					title="User not authenticated"
					description="You must be signed in to view account settings."
					buttonText="Go to Sign In"
					redirectTo="/auth"
				/>
			)}
			{auth.isAuth && (
				<div className="space-y-10">
					<h1 className="text-2xl font-semibold">Settings</h1>

					<UserInfoCard update />

					<section className="space-y-3">
						<div className="max-w-xl space-y-1">
							<h2 className="text-lg font-semibold">
								Update Profile
							</h2>
							<p className="text-muted-foreground text-sm">
								Change your name, username, or email address.
							</p>
						</div>
						<UpdateUserForm />
					</section>

					<section className="space-y-3">
						<div className="max-w-xl space-y-1">
							<h2 className="text-lg font-semibold">
								Update Password
							</h2>
							<p className="text-muted-foreground text-sm">
								Choose a new password and confirm it below.
							</p>
						</div>
						<UpdateUserPasswordForm />
					</section>

					<section className="max-w-xl space-y-3">
						<div className="space-y-1">
							<h2 className="text-destructive text-lg font-semibold">
								Danger Zone
							</h2>
							<p className="text-muted-foreground text-sm">
								This action permanently deletes your account.
							</p>
						</div>
						<Dialog>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									className="border-destructive/30 text-destructive hover:bg-destructive/10 focus-visible:outline-destructive/40 flex min-h-11 w-full max-w-xl items-center justify-center rounded-md border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
									aria-label="Delete user account"
								>
									Delete User Account
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-md">
								<DeleteUserDataForm embedded />
							</DialogContent>
						</Dialog>
					</section>
				</div>
			)}
		</div>
	);
};
export default SettingsPage;
