import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UIState } from '@shared/types/server/redux/index.js';

const initialState: UIState = {
	appName: '',
	theme: 'light',
	userForm: '',
	closeAvatarPopover: false,
	currentPage: { url: '', content: {}, isLoading: false },
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setAppName: (
			state,
			action: PayloadAction<{ appName: UIState['appName'] }>,
		) => {
			state.appName = action.payload.appName;
		},
		toggleTheme: (
			state,
			action: PayloadAction<{ theme: UIState['theme'] }>,
		) => {
			state.theme = action.payload.theme;
		},
		handleUserFormToggle: (
			state,
			action: PayloadAction<{
				userForm: UIState['userForm'];
			}>,
		) => {
			state.userForm = action.payload.userForm;
		},

		handleAvatarPopoverClose: (
			state,
			action: PayloadAction<{
				closeAvatarPopover: UIState['closeAvatarPopover'];
			}>,
		) => {
			state.closeAvatarPopover = action.payload.closeAvatarPopover;
		},
		loadCurrentPageState: (
			state,
			action: PayloadAction<{
				currentPage: UIState['currentPage'];
			}>,
		) => {
			state.currentPage = action.payload.currentPage;
		},
		toggleCurrentIsLoading: (
			state,
			action: PayloadAction<{
				currentPage: UIState['currentPage'];
			}>,
		) => {
			state.currentPage.isLoading = action.payload.currentPage.isLoading;
		},
	},
});

export const {
	setAppName,
	toggleTheme,
	handleUserFormToggle,
	handleAvatarPopoverClose,
	loadCurrentPageState,
	toggleCurrentIsLoading,
} = uiSlice.actions;
export default uiSlice.reducer;
