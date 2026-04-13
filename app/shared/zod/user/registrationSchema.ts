import { z } from 'zod';

export const RegistrationSchema = z
	.object({
		firstName: z.string().min(1).optional(),
		lastName: z.string().min(1).optional(),
		emailAddress: z.string().email(),
		userName: z.string().min(3),
		password: z.string().min(6, 'Must be at least 6 characters.'),
		confirmPassword: z.string().min(6, 'Must be at least 6 characters.'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});
