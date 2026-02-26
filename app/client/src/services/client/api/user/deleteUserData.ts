import api from '@shared/axios/index.js';

export const deleteUserData = () => {
	return api.delete('/user/delete-user');
};
