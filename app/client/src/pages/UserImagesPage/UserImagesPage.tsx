import { useEffect } from 'react';
import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';
import { useOutletContext } from 'react-router';
const UserImagesPage = () => {
	const ui = useOutletContext<UIUtility>();

	useEffect(() => {
		document.title = `Images | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default UserImagesPage;
