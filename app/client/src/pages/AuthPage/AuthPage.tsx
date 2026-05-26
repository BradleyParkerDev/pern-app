import {
	LoginForm,
	RegistrationForm,
	StatusCard,
} from '@client/components/index.js';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { BadgeCheck } from 'lucide-react';
const AuthPage = () => {
	const { ui, auth, user } = useOutletContext<AppOutletContext>();
	useEffect(() => {
		document.title = `Auth | ${ui.appName}`;
	}, []);

	const [formDisplayed, setFormDisplayed] = useState('Welcome back!');

	// Toggle login and registration forms
	const toggleAuthPageForms = () => {
		if (formDisplayed === 'Welcome back!') {
			setFormDisplayed('Create an account.');
		} else {
			setFormDisplayed('Welcome back!');
		}
	};

	// Show login form with navbar sign in button
	useEffect(() => {
		if (ui.authPageForm === 'login') {
			setFormDisplayed('Welcome back!');
			ui.toggleAuthPageFormsWithNavAuthButton();
		}
	}, [ui.authPageForm]);

	const showForms = () => {
		if (formDisplayed === 'Create an account.') {
			return (
				<RegistrationForm toggleAuthPageForms={toggleAuthPageForms} />
			);
		}

		if (formDisplayed === 'Welcome back!') {
			return <LoginForm toggleAuthPageForms={toggleAuthPageForms} />;
		}
	};
	const handleAuthView = () => {
		const forms = showForms();

		if (auth.isAuth) {
			return (
				<StatusCard
					ui={ui}
					icon={<BadgeCheck />}
					title="User Authenticated"
					description="User is already authenticated."
					buttonText="Go to user page."
					redirectTo={`/user/${user.userName}`}
				/>
			);
		} else {
			return forms;
		}
	};

	const authView = handleAuthView();

	return (
		<div
			id="auth-page"
			className={`flex h-full w-full flex-col items-center gap-6 p-6 text-center`}
		>
			{' '}
			{!auth.isAuth && (
				<p className="dark:text-foreground text-xl font-semibold">
					{formDisplayed}
				</p>
			)}
			{authView}
		</div>
	);
};

export default AuthPage;
