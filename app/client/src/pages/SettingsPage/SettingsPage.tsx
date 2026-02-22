import React from 'react';
import { useEffect } from 'react';
import { useUIUtility } from '@client/hooks/index.js';

const SettingsPage = () => {
	const ui = useUIUtility();
	useEffect(() => {
		document.title = `Settings | ${ui.appName}`;
	}, []);

	return <div>SettingsPage</div>;
};

export default SettingsPage;
