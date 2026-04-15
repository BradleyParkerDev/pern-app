import { useAppSelector } from '@shared/redux/hooks.js';
import {
	useUIThemeHelper,
	useUINavHelper,
	useUIFormHelper,
	useUIEffectHelper,
	useUIPageHelper,
} from './helpers/index.js';

export const useUIUtility = () => {
	const appName = useAppSelector((state) => state.ui.appName);

	const themeHelper = useUIThemeHelper();
	const navHelper = useUINavHelper();
	const formHelper = useUIFormHelper();

	useUIPageHelper();

	const effectHelper = useUIEffectHelper({
		closeAvatarPopover: navHelper.closeAvatarPopover,
	});

	return {
		appName,
		...themeHelper,
		...navHelper,
		...formHelper,
		...effectHelper,
	};
};

export type UIUtility = ReturnType<typeof useUIUtility>;
