import { useEffect } from 'react';
import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';
import { useOutletContext } from 'react-router';
const FriendPage = () => {
	const ui = useOutletContext<UIUtility>();
	useEffect(() => {
		document.title = `Friends | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default FriendPage;
