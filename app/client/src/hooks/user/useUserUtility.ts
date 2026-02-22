import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { clientApiServices } from '@client/services/client/index.js';
import {
	LoginCredentials,
	UserRegistrationInput,
} from '@shared/types/server/zod/index.js';

import { setUser, resetUser } from '@shared/redux/slices/user/userSlice.js';
export const useUserUtility = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const { firstName, lastName, emailAddress, userName } = user;

	const signUp = async (userRegistrationData: UserRegistrationInput) => {
		const response =
			await clientApiServices.user.registerNewUser(userRegistrationData);
		console.log(response);
	};

	const login = async (loginCredentials: LoginCredentials) => {
		const response =
			await clientApiServices.auth.loginUser(loginCredentials);

		console.log(response);
	};

	const logout = async () => {
		const response = await clientApiServices.auth.logoutUser();
		console.log(response);
	};

	const update = async () => {};

	const fetchUserData = async () => {};

	const deleteUserAccount = async () => {};

	return {
		firstName,
		lastName,
		emailAddress,
		userName,
		signUp,
		login,
		logout,
	};
};
