import { useEffect } from 'react';
import {
	AuthUtility,
	UIUtility,
	UserUtility,
} from '@shared/types/client/hooks/index.js';
import { useOutletContext } from 'react-router';

const NewsPage = () => {
	const auth = useOutletContext<AuthUtility>();
	const ui = useOutletContext<UIUtility>();
	const user = useOutletContext<UserUtility>();
	useEffect(() => {
		document.title = `News | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default NewsPage;
