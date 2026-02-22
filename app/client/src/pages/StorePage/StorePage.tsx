import { useEffect } from 'react';
import { useUIUtility } from '@client/hooks/index.js';

const StorePage = () => {
	const ui = useUIUtility();
	useEffect(() => {
		document.title = `Store | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default StorePage;
