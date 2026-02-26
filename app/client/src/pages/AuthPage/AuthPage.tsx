import { LoginForm, RegistrationForm } from '@client/components/index.js';
import { useState, useEffect } from 'react';
import { useUIUtility, useUserUtility } from '@client/hooks/index.js';

const AuthPage = () => {
	const ui = useUIUtility();
	useEffect(() => {
		document.title = `Auth | ${ui.appName}`;
	}, []);

	const [formDisplayed, setFormDisplayed] = useState('Welcome back!');

	// Toggle login and registration forms
	const toggleUserForms = () => {
		if (formDisplayed === 'Welcome back!') {
			setFormDisplayed('Create an account.');
		} else {
			setFormDisplayed('Welcome back!');
		}
	};

	// Show login form with navbar sign in button
	useEffect(() => {
		if (ui.userForm === 'login') {
			setFormDisplayed('Welcome back!');
			ui.toggleUserFormsWithNavUserButton();
		}
	}, [ui.userForm]);

	return (
		<div
			id="auth-page"
			className={`flex h-full w-full flex-col items-center gap-6 p-6 text-center`}
		>
			<p className="dark:text-foreground text-xl font-semibold">
				{formDisplayed}
			</p>
			{formDisplayed === 'Welcome back!' && (
				<LoginForm toggleUserForms={toggleUserForms} />
			)}
			{formDisplayed === 'Create an account.' && (
				<RegistrationForm toggleUserForms={toggleUserForms} />
			)}
		</div>
	);
};

export default AuthPage;
