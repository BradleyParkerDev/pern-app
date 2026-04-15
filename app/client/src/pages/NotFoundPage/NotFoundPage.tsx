import { useOutletContext } from 'react-router';
import { SearchX } from 'lucide-react';

import { StatusCard } from '@client/components/index.js';
import type { AppOutletContext } from '@shared/types/client/hooks/index.js';

const NotFoundPage = () => {
	const { ui } = useOutletContext<AppOutletContext>();

	return (
		<StatusCard
			ui={ui}
			icon={<SearchX />}
			title="Page Not Found"
			description="The page you are looking for does not exist."
			buttonText="Go Home"
			redirectTo="/"
		/>
	);
};

export default NotFoundPage;
