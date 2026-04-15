import api from '@shared/axios/index.js';
import type { UserThemeType } from '@shared/types/common/UserThemeType.js';
import type { APIResponseType } from '@shared/types/common/api/ApiResponseType.js';
import axios from 'axios';

type UpdateUserThemeResponseDataType = {
	theme: UserThemeType;
};

export const toggleUserTheme = async (
	theme: UserThemeType,
): Promise<APIResponseType<UpdateUserThemeResponseDataType>> => {
	try {
		const { data: result } = await api.put('/ui/update-user-theme', {
			theme,
		});

		return result;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.data) {
			return error.response.data;
		}

		throw error;
	}
};
