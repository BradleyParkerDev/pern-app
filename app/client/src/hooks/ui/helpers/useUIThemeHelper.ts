import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { setTheme } from '@shared/redux/slices/ui/uiSlice.js';
import { clientApiServices } from '@client/services/client/index.js';

export const useUIThemeHelper = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.ui.theme);

	const toggleUserTheme = async () => {
		const currentTheme = theme;
		const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

		// optimistic update
		dispatch(setTheme({ theme: nextTheme }));

		try {
			const result =
				await clientApiServices.ui.toggleUserTheme(nextTheme);

			if (!result.success) {
				// silent rollback
				dispatch(setTheme({ theme: currentTheme }));
			}

			return result;
		} catch (error) {
			console.error('[THEME TOGGLE ERROR]', error);

			// silent rollback
			dispatch(setTheme({ theme: currentTheme }));

			throw error;
		}
	};

	return {
		theme,
		toggleUserTheme,
	};
};
