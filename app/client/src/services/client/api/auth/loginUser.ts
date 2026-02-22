import api from '@shared/axios/index.js';
import { LoginCredentials } from '@shared/types/server/zod/index.js';
export const loginUser = (loginCredentials: LoginCredentials) => {
	return api.post('/auth/login-user', loginCredentials);
};
