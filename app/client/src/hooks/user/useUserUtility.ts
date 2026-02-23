import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { clientApiServices } from '@client/services/client/index.js';
import {
	LoginCredentials,
	UserRegistrationInput,
} from '@shared/types/server/zod/index.js';

import { setUser, resetUser } from '@shared/redux/slices/user/userSlice.js';
import { useUIUtility } from '@client/hooks/ui/useUIUtility.js';
export const useUserUtility = () => {
	const ui = useUIUtility();
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const auth = useAppSelector((state) => state.auth);

	const { firstName, lastName, emailAddress, userName } = user;

	const signUp = async (userRegistrationData: UserRegistrationInput) => {
		const response =
			await clientApiServices.user.registerNewUser(userRegistrationData);
		console.log(response);
	};

	const login = async (loginCredentials: LoginCredentials) => {
		const response =
			await clientApiServices.auth.loginUser(loginCredentials);
		// ui.navigateTo('/', true);
		console.log(response);
	};

	const logout = async () => {
		const response = await clientApiServices.auth.logoutUser();
		console.log(response);
		// ui.navigateTo('/', true);
		dispatch(resetUser());
	};

	const update = async () => {};

	const fetchUserData = async () => {};

	const deleteUserAccount = async () => {};

	return {
		auth,
		firstName,
		lastName,
		emailAddress,
		userName,
		signUp,
		login,
		logout,
	};
};
