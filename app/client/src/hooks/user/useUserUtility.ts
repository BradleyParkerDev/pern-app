import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { clientApiServices } from '@client/services/client/index.js';
import axios from 'axios';
import { LoginCredentialsDataType } from '@shared/types/common/LoginCredentialsDataType.js';
import { UserRegistrationDataType } from '@shared/types/server/user/index.js';

import {
	type DeleteUserDataFormType,
	type UpdateUserDataFormType,
	type UpdateUserPasswordFormType,
} from '@shared/types/client/formInput/index.js';
import { setUser, resetUser } from '@shared/redux/slices/user/userSlice.js';
import { setAuth, resetAuth } from '@shared/redux/slices/auth/authSlice.js';
import { setTheme, resetUI } from '@shared/redux/slices/ui/uiSlice.js';
import { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';

export const useUserUtility = (ui: UIUtility) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const auth = useAppSelector((state) => state.auth);

	const { firstName, lastName, emailAddress, userName } = user;

	const signUp = async (userRegistrationData: UserRegistrationDataType) => {
		try {
			const response =
				await clientApiServices.user.registerNewUser(
					userRegistrationData,
				);

			return {
				success: true as const,
				data: response.data,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					success: false as const,
					message:
						error.response?.data?.message || 'Registration failed.',
				};
			}

			return {
				success: false as const,
				message: 'Registration failed.',
			};
		}
	};

	const login = async (loginCredentials: LoginCredentialsDataType) => {
		try {
			const response =
				await clientApiServices.auth.loginUser(loginCredentials);

			if (response.data.success === true) {
				const userResponse =
					await clientApiServices.user.fetchUserData();
				const userData = userResponse.data?.user;
				const theme = userResponse.data?.theme ?? 'light';
				console.log(`theme: ${theme}`);
				if (userData) {
					dispatch(setUser({ userData }));
					dispatch(setAuth({ isAuth: true }));
					dispatch(setTheme({ theme }));
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
			dispatch(resetUI());
			ui.navigateTo(`/`);
		}
		console.log(response);
	};

	const update = async (
		userUpdateData: UpdateUserDataFormType | UpdateUserPasswordFormType,
	) => {
		const response =
			await clientApiServices.user.updateUserData(userUpdateData);

		if (response.data.success === true) {
			const userResponse = await clientApiServices.user.fetchUserData();
			const userData = userResponse.data?.user;
			const theme = userResponse.data?.theme ?? 'light';
			console.log(`theme: ${theme}`);
			if (userData) {
				dispatch(setUser({ userData }));
				dispatch(setAuth({ isAuth: true }));
				dispatch(setTheme({ theme }));
			}
		}
	};

	const deleteUserAccount = async (
		userAccountDeletionData: DeleteUserDataFormType,
	) => {
		try {
			const response = await clientApiServices.user.deleteUserData(
				userAccountDeletionData,
			);

			if (response.data?.success === true) {
				dispatch(resetUser());
				dispatch(resetAuth());
				dispatch(resetUI());
				ui.navigateTo('/');
			}

			return {
				success: Boolean(response.data?.success),
				message: String(
					response.data?.message ??
						'User account deletion request completed.',
				),
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					success: false as const,
					message:
						(typeof error.response?.data?.message === 'string' &&
							error.response.data.message) ||
						'Failed to delete user account.',
				};
			}

			return {
				success: false as const,
				message: 'Failed to delete user account.',
			};
		}
	};
	const uploadProfileImage = async (file: File) => {
		try {
			const response = await clientApiServices.image.uploadImage(file);

			return {
				success: true as const,
				message: String(
					response.data?.message ?? 'Image uploaded successfully.',
				),
				data: response.data,
			};
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return {
					success: false as const,
					message:
						(typeof error.response?.data?.message === 'string' &&
							error.response.data.message) ||
						'Failed to upload image.',
				};
			}

			return {
				success: false as const,
				message: 'Failed to upload image.',
			};
		}
	};
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
		uploadProfileImage,
	};
};
