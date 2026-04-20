import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UIState } from '@/shared/types/common/redux/index.js';

const initialState: UIState = {
	appName: '',
	theme: 'light',
	authPageForm: '',
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
		resetUI: (state) => initialState,

		handleAuthPageFormToggle: (
			state,
			action: PayloadAction<{
				authPageForm: UIState['authPageForm'];
			}>,
		) => {
			state.authPageForm = action.payload.authPageForm;
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
	handleAuthPageFormToggle,
	loadCurrentPageState,
	toggleCurrentIsLoading,
} = uiSlice.actions;
export default uiSlice.reducer;
