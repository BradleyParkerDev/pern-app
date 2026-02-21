import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';

export const useUserUtility = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);
	const { firstName, lastName, emailAddress, userName } = user;

	return {
		firstName,
		lastName,
		emailAddress,
		userName,
	};
};
