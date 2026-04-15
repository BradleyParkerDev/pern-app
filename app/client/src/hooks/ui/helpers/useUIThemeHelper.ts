import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { setTheme } from '@shared/redux/slices/ui/uiSlice.js';
import { clientApiServices } from '@client/services/client/index.js';

export const useUIThemeHelper = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.ui.theme);

	const toggleUserTheme = async () => {
		const nextTheme = theme === 'light' ? 'dark' : 'light';

		dispatch(setTheme({ theme: nextTheme }));

		await clientApiServices.ui.toggleUserTheme(nextTheme);
	};

	return {
		theme,
		toggleUserTheme,
	};
};
