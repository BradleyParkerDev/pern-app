import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { clientApiServices } from '@client/services/client/index.js';
import axios from 'axios';
import {
	LoginCredentials,
	UserRegistrationInput,
} from '@shared/types/server/zod/index.js';

import { setUser, resetUser } from '@shared/redux/slices/user/userSlice.js';
import { setAuth, resetAuth } from '@shared/redux/slices/auth/authSlice.js';
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
		try {
			const response =
				await clientApiServices.auth.loginUser(loginCredentials);

			if (response.data.success === true) {
				console.log(response);
				const userResponse =
					await clientApiServices.user.fetchUserData();
				const userData = userResponse.data?.user;
				console.log(userData);

				if (userData) {
					dispatch(setUser({ userData }));
					dispatch(setAuth({ isAuth: true }));
					ui.navigateTo(`/user/${userData.userName}`);
				}
			}

			return {
				success: true as const,
				message: String(response.data.message ?? 'Login successful.'),
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					success: false as const,
					message:
						(typeof error.response?.data?.message === 'string' &&
							error.response.data.message) ||
						'Login failed.',
				};
			}

			return { success: false as const, message: 'Login failed.' };
		}
	};

	const logout = async () => {
		const response = await clientApiServices.auth.logoutUser();
		const success = response.data.success;
		if (success) {
			dispatch(resetUser());
			dispatch(resetAuth());
			ui.navigateTo(`/`);
		}
		console.log(response);
	};

	const update = async () => {};

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
		update,
		deleteUserAccount,
	};
};
