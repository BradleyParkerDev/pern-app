import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UIState } from '@shared/types/server/redux/index.js';

const initialState: UIState = {
	appName: '',
	theme: 'light',
	userForm: '',
	currentPage: { path: '', content: {}, isLoading: false },
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
		setTheme: (
			state,
			action: PayloadAction<{ theme: UIState['theme'] }>,
		) => {
			state.theme = action.payload.theme;
		},
		resetUI: (state) => {
			((state.theme = 'light'),
				(state.userForm = ''),
				(state.currentPage = {
					path: '',
					content: {},
					isLoading: false,
				}));
		},

		handleUserFormToggle: (
			state,
			action: PayloadAction<{
				userForm: UIState['userForm'];
			}>,
		) => {
			state.userForm = action.payload.userForm;
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
	setTheme,
	resetUI,
	handleUserFormToggle,
	loadCurrentPageState,
	toggleCurrentIsLoading,
} = uiSlice.actions;
export default uiSlice.reducer;
