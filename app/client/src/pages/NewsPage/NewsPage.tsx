import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { Construction } from 'lucide-react';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';
import { StatusCard } from '@client/components/index.js';

const NewsPage = () => {
	const { ui } = useOutletContext<AppOutletContext>();

	useEffect(() => {
		document.title = `News | ${ui.appName}`;
	}, [ui.appName]);

	return (
		<StatusCard
			ui={ui}
			icon={<Construction />}
			title="Page Under Construction"
			description="We are still building this experience. Check back soon for updates."
			buttonText="Return Home"
			redirectTo="/"
		/>
	);
};

export default NewsPage;
