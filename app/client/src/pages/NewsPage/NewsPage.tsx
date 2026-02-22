import { useEffect } from 'react';
import { useUIUtility } from '@client/hooks/index.js';

const NewsPage = () => {
	const ui = useUIUtility();
	useEffect(() => {
		document.title = `News | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default NewsPage;
