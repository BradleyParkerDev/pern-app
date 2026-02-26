import api from '@shared/axios/index.js';

export const fetchUserData = () => {
	return api.get('/user/get-user');
};
