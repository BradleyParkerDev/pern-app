import api from '@shared/axios/index.js';
import { LoginCredentialsDataType } from '@shared/types/common/LoginCredentialsDataType.js';
export const loginUser = (loginCredentials: LoginCredentialsDataType) => {
	return api.post('/auth/login-user', loginCredentials);
};
