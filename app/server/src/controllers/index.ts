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
// import getCurrentPageState from './ui/getCurrentPageState.js';
import updateUserTheme from './ui/updateUserTheme.js';

// page content controller
import getHomePageContent from './pageContent/homePage/homePage.js';
import getChatPageContent from './pageContent/chat/chat.js';
import getFriendsPageContent from './pageContent/friends/friends.js';
import getImagesPageContent from './pageContent/images/images.js';
import getNewsPageContent from './pageContent/news/news.js';
import getUserPageContent from './pageContent/userPage/userPage.js';
import getStorePageContent from './pageContent/store/store.js';

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
	// getCurrentPageState,
	updateUserTheme,
};

export const pageContentController = {
	getHomePageContent,
	getChatPageContent,
	getFriendsPageContent,
	getImagesPageContent,
	getNewsPageContent,
	getUserPageContent,
	getStorePageContent,
};

// export webController
export const webController = {
	web,
};
