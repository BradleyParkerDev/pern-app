import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { clientApiServices } from '@client/services/client/index.js';
import { LoginCredentials } from '@shared/types/server/zod/index.js';
export const useUserUtility = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const { firstName, lastName, emailAddress, userName } = user;

	const login = async (loginCredentials: LoginCredentials) => {
		const response =
			await clientApiServices.auth.loginUser(loginCredentials);

		console.log(response);
	};

	const logout = async () => {};

	const signUp = async () => {};

	const fetchUserData = async () => {};

	const deleteUserAccount = async () => {};

	return {
		firstName,
		lastName,
		emailAddress,
		userName,
		login,
	};
};
