import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';

import { UserInfoCard } from '@client/components/index.js';

const UserPage = () => {
	const { ui, auth, user } = useOutletContext<AppOutletContext>();

	useEffect(() => {
		document.title = `User | ${ui.appName}`;
	}, []);

	const { userName } = useParams<{ userName?: string }>();

	return (
		<div
			id="user-page"
			className="mx-auto flex h-full w-full max-w-2xl flex-col space-y-8 px-4 py-6"
		>
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
						Cards for saved articles or the user's order history
						could live here.
					</p>
				</div>
			</section>
		</div>
	);
};

export default UserPage;
