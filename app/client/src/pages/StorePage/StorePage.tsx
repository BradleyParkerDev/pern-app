import { useEffect } from 'react';
import { useUIUtility } from '@client/hooks/index.js';
import {
	AuthUtility,
	UIUtility,
	UserUtility,
} from '@shared/types/client/hooks/index.js';
import { useOutletContext } from 'react-router';

const StorePage = () => {
	const auth = useOutletContext<AuthUtility>();
	const ui = useOutletContext<UIUtility>();
	const user = useOutletContext<UserUtility>();
	useEffect(() => {
		document.title = `Store | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default StorePage;
