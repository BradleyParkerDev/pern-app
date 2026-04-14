import api from '@shared/axios/index.js';
import { DeleteUserDataFormType } from '@shared/types/client/formInput/index.js';
export const deleteUserData = (
	userAccountDeletionData: DeleteUserDataFormType,
) => {
	return api.delete('/user/delete-user', {
		data: userAccountDeletionData,
	});
};
