import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';

const UserImagesPage = () => {
	const { ui, auth, user } = useOutletContext<AppOutletContext>();

	useEffect(() => {
		document.title = `Images | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default UserImagesPage;
