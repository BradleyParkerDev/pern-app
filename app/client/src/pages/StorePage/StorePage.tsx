import { useEffect } from 'react';
import { useUIUtility } from '@client/hooks/index.js';
import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';
import { useOutletContext } from 'react-router';
const StorePage = () => {
	const ui = useOutletContext<UIUtility>();
	useEffect(() => {
		document.title = `Store | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default StorePage;
