import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import type { UIUtility } from '@/shared/types/client/hooks/UIUtility.js';
import {
	useUserAuthHelper,
	useUserCrudHelper,
	useImageHelper,
} from './helpers/index.js';

export const useUserUtility = (ui: UIUtility) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.user);

	const { firstName, lastName, emailAddress, userName } = user;

	const authHelper = useUserAuthHelper({ dispatch, ui });
	const crudHelper = useUserCrudHelper({ dispatch, ui });
	const imageHelper = useImageHelper();

	return {
		firstName,
		lastName,
		emailAddress,
		userName,
		...authHelper,
		...crudHelper,
		...imageHelper,
	};
};
