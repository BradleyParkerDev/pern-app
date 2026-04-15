import { useAppDispatch, useAppSelector } from '@shared/redux/hooks.js';
import { handleAuthPageFormToggle } from '@shared/redux/slices/ui/uiSlice.js';

export const useUIFormHelper = () => {
	const dispatch = useAppDispatch();
	const authPageForm = useAppSelector((state) => state.ui.authPageForm);

	const toggleAuthPageFormsWithNavUserButton = () => {
		dispatch(
			handleAuthPageFormToggle({
				authPageForm: authPageForm === '' ? 'login' : '',
			}),
		);
	};

	return {
		authPageForm,
		toggleAuthPageFormsWithNavUserButton,
	};
};
