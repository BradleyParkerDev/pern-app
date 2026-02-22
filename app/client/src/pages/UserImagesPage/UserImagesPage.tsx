import { useEffect } from 'react';
import { useUIUtility } from '@client/hooks/index.js';

const UserImagesPage = () => {
	const ui = useUIUtility();

	useEffect(() => {
		document.title = `Images | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default UserImagesPage;
