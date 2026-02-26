import React from 'react';
import { useEffect } from 'react';
import { useUIUtility, useUserUtility } from '@client/hooks/index.js';

const SettingsPage = () => {
	const ui = useUIUtility();
	const user = useUserUtility();

	useEffect(() => {
		document.title = `Settings | ${ui.appName}`;
	}, []);

	return (
		<div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-6">
			<h1 className="text-2xl font-semibold">Settings</h1>
			<button
				type="button"
				onClick={() => user.deleteUserAccount()}
				className="border-destructive/30 text-destructive hover:bg-destructive/10 focus-visible:outline-destructive/40 flex min-h-11 w-full items-center justify-center rounded-md border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
				aria-label="Delete user account"
			>
				Delete User Account
			</button>
		</div>
	);
};
export default SettingsPage;
