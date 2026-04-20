import { type UserThemeType } from '@shared/types/common/UserThemeType.js';
import type { PageContent } from '@shared/types/common/page/PageContent.js';

interface CurrentPage {
	path?: string;
	content?: PageContent;
	isLoading?: boolean;
}

export type UIState = {
	appName: string;
	theme: UserThemeType;
	authPageForm: string;
	currentPage: CurrentPage;
};
