// auth controller imports
import loginUser from './auth/loginUser.js';
import logoutUser from './auth/logoutUser.js';

// images controller
import uploadImage from './image/uploadImage.js';
import deleteImage from './image/deleteImage.js';

// user controller
import registerUser from './user/registerUser.js';
import getUser from './user/getUser.js';
import updateUser from './user/updateUser.js';
import deleteUser from './user/deleteUser.js';

// ui controller
import getCurrentPageState from './ui/getCurrentPageState.js';
import updateUserTheme from './ui/updateUserTheme.js';

// web controller import
import web from './web/index.js';

// export authController
export const authController = {
	loginUser,
	logoutUser,
};

export const imageController = {
	uploadImage,
	deleteImage,
};

// export userController
export const userController = {
	registerUser,
	getUser,
	updateUser,
	deleteUser,
};

export const uiController = {
	getCurrentPageState,
	updateUserTheme,
};

// export webController
export const webController = {
	web,
};
