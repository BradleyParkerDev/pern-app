import { useAppSelector } from '@shared/redux/hooks.js';

export const useAuthUtility = () => {
	const auth = useAppSelector((state) => state.auth);
	const { isAuth, authLoading } = auth;

	return {
		isAuth,
		authLoading,
	};
};
