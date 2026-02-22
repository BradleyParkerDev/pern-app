import api from '@shared/axios/index.js';
export const logoutUser = () => {
	return api.delete('/auth/logout-user');
};
