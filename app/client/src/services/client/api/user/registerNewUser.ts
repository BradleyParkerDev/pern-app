import api from '@shared/axios/index.js';
import { UserRegistrationDataType } from '@shared/types/server/user/index.js';
export const registerNewUser = (
	userRegistrationData: UserRegistrationDataType,
) => {
	return api.post('/user/register-user', userRegistrationData);
};
