import { useUIUtility } from '@client/hooks/index.js';

const NewsPage = () => {
	const ui = useUIUtility();
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default NewsPage;
