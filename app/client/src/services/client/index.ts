import { loginUser } from './api/auth/loginUser.js';
import { logoutUser } from './api/auth/logoutUser.js';

import { deleteUserData } from './api/user/deleteUserData.js';
import { fetchUserData } from './api/user/fetchUserData.js';
import { registerNewUser } from './api/user/registerNewUser.js';
import { updateUserData } from './api/user/updateUserData.js';

import { fetchCurrentpageState } from './api/ui/fetchCurrentPageState.js';
import { toggleUserTheme } from './api/ui/toggleUserTheme.js';

import { uploadImage } from './api/image/uploadImage.js';
import { deleteImage } from './api/image/deleteImage.js';

export const auth = {
	loginUser,
	logoutUser,
};

export const user = {
	deleteUserData,
	fetchUserData,
	registerNewUser,
	updateUserData,
};

export const image = {
	uploadImage,
	deleteImage,
};

export const ui = { fetchCurrentpageState, toggleUserTheme };

export const clientApiServices = {
	auth,
	user,
	ui,
	image,
};
