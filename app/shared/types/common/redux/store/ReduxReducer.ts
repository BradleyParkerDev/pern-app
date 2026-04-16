import authReducer from '@shared/redux/slices/auth/authSlice.js';
import uiReducer from '@shared/redux/slices/ui/uiSlice.js';
import userReducer from '@shared/redux/slices/user/userSlice.js';
import imageReducer from '@shared/redux/slices/image/imageSlice.js';

export type ReduxReducer = {
	auth: typeof authReducer;
	ui: typeof uiReducer;
	user: typeof userReducer;
	image: typeof imageReducer;
};
