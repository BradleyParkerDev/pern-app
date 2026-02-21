import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AuthState } from '@shared/types/server/redux/index.js';

const initialState: AuthState = {
	isAuth: false,
	authLoading: true,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<Pick<AuthState, 'isAuth'>>) => {
			state.isAuth = action.payload.isAuth;
			state.authLoading = false;
		},
		resetAuth: () => initialState,
	},
});

export const { setAuth, resetAuth } = authSlice.actions;

export type AuthReducer = typeof authSlice.reducer;
export default authSlice.reducer;
