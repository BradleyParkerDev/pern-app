import { useEffect } from 'react';
import { useUIUtility } from '@client/hooks/index.js';

const ChatPage = () => {
	const ui = useUIUtility();
	useEffect(() => {
		document.title = `Chat | ${ui.appName}`;
	}, []);
	const PageUnderConstruction = ui.ShowPageUnderConstruction();

	return <PageUnderConstruction ui={ui} />;
};

export default ChatPage;
