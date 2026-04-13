import api from '@shared/axios/index.js';
import {
	type UpdateUserDataFormType,
	type UpdateUserPasswordFormType,
} from '@shared/types/client/formInput/index.js';
export const updateUserData = (
	userUpdateData: UpdateUserDataFormType | UpdateUserPasswordFormType,
) => {
	return api.put('/user/update-user', userUpdateData);
};
