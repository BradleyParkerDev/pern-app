import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';

import { UserInfoCard, StatusCard } from '@client/components/index.js';
import { Lock } from 'lucide-react';

const UserPage = () => {
	const { ui, auth } = useOutletContext<AppOutletContext>();

	useEffect(() => {
		document.title = `User | ${ui.appName}`;
	}, []);

	return (
		<div
			id="user-page"
			className="mx-auto flex h-full w-full max-w-2xl flex-col space-y-8 px-4 py-6"
		>
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
					<section className="space-y-3">
						<div className="max-w-xl space-y-1">
							<h1 className="text-2xl font-semibold">Profile</h1>
							<p className="text-muted-foreground text-sm">
								View user account details and/or public profile
								information.
							</p>
						</div>
						<UserInfoCard />
					</section>

					<section className="space-y-3">
						<div className="max-w-xl space-y-1">
							<h2 className="text-lg font-semibold">Content</h2>
							<p className="text-muted-foreground text-sm">
								Cards for saved articles or the user's order
								history could live here.
							</p>
						</div>
					</section>
				</div>
			)}
		</div>
	);
};

export default UserPage;
