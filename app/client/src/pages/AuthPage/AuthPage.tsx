import { LoginForm, RegistrationForm } from '@client/components/index.js';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';

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
			ui.toggleAuthPageFormsWithNavUserButton();
		}
	}, [ui.authPageForm]);

	return (
		<div
			id="auth-page"
			className={`flex h-full w-full flex-col items-center gap-6 p-6 text-center`}
		>
			<p className="dark:text-foreground text-xl font-semibold">
				{formDisplayed}
			</p>
			{formDisplayed === 'Welcome back!' && (
				<LoginForm toggleAuthPageForms={toggleAuthPageForms} />
			)}
			{formDisplayed === 'Create an account.' && (
				<RegistrationForm toggleAuthPageForms={toggleAuthPageForms} />
			)}
		</div>
	);
};

export default AuthPage;
