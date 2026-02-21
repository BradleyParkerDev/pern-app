import api from '@shared/axios/index.js';
export const fetchCurrentpageState = async (path: string) => {
	const response = await api.get('/ui/page-state', {
		params: { path: path },
	});
	return response.data;
};
