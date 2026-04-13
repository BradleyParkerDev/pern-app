import api from '@shared/axios/index.js';
import { type UserThemeType } from '@shared/types/common/UserThemeType.js';

export const toggleUserTheme = async (theme: UserThemeType) => {
	const response = await api.put('/ui/update-user-theme', { theme });
	return response.data;
};
