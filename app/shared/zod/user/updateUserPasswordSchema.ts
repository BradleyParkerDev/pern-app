import { z } from 'zod';

export const UpdateUserPasswordSchema = z
	.object({
		currentPassword: z.string().min(6, 'Must be at least 6 characters.'),
		newPassword: z.string().min(6, 'Must be at least 6 characters.'),
		confirmedNewPassword: z
			.string()
			.min(6, 'Must be at least 6 characters.'),
	})
	.refine((data) => data.newPassword === data.confirmedNewPassword, {
		message: 'Passwords do not match',
		path: ['confirmedNewPassword'],
	});
