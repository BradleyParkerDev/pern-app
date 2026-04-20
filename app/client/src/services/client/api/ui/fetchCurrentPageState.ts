import api from '@shared/axios/index.js';
import type {
	APIResponseType,
	PageContent,
} from '@shared/types/common/index.js';

export const fetchCurrentpageState = async (
	path: string,
): Promise<PageContent> => {
	const response = await api.get<APIResponseType<PageContent>>(
		`/page-content${path}`,
		{
			params: { path },
		},
	);

	return response.data.data;
};
