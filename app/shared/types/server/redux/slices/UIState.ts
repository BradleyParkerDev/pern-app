import { type UserThemeType } from '@shared/types/common/UserThemeType.js';

interface currentPage {
	path?: string;
	content?: object;
	isLoading?: boolean;
}
export type UIState = {
	appName: string;
	theme: UserThemeType;
	userForm: string;
	closeAvatarPopover: boolean;
	currentPage: currentPage;
};
