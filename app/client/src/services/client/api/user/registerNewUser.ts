import api from '@shared/axios/index.js';
import { UserRegistrationInput } from '@shared/types/server/zod/index.js';

export const registerNewUser = (
	userRegistrationInput: UserRegistrationInput,
) => {
	return api.post('/user/register-user', userRegistrationInput);
};
