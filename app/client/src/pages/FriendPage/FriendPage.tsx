import { useEffect } from 'react';
import { useUIUtility } from '@client/hooks/index.js';

const FriendPage = () => {
	const ui = useUIUtility();
	useEffect(() => {
		document.title = `Friends | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default FriendPage;
