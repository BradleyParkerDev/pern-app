interface currentPage {
	url?: string;
	content?: object;
	isLoading?: boolean;
}
export type UIState = {
	appName: string;
	theme: 'light' | 'dark';
	userForm: string;
	closeAvatarPopover: boolean;
	currentPage: currentPage;
};
