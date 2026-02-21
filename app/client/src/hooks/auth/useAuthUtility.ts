import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';

export const useAuthUtility = () => {
	const dispatch = useAppDispatch();
	const auth = useAppSelector((state) => state.auth);
	const { isAuth } = auth;

	return {
		isAuth: isAuth,
	};
};
