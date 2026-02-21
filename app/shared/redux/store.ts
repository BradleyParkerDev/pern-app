// app/shared/redux/store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@shared/redux/slices/auth/authSlice.js';
import uiReducer from '@shared/redux/slices/ui/uiSlice.js';
import userReducer from '@shared/redux/slices/user/userSlice.js';
import { type ReduxReducer } from '@shared/types/server/redux/index.js';

// Combine Reducers
const reducer = combineReducers<ReduxReducer>({
	auth: authReducer,
	ui: uiReducer,
	user: userReducer,
});
export type ReducerState = ReturnType<typeof reducer>;

// Create Redux Store
export function createStore(preloadedState?: ReducerState) {
	return configureStore({
		reducer,
		preloadedState,
		// Always enable Redux DevTools in the browser; extension will no-op if absent.
		devTools: true,
	});
}
