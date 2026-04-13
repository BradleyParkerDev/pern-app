import { z } from 'zod';

const emptyToUndefined = (val: unknown) =>
	typeof val === 'string' && val.trim() === '' ? undefined : val;

export const LoginSchema = z
	.object({
		emailAddress: z.preprocess(
			emptyToUndefined,
			z.string().email().optional(),
		),

		userName: z.preprocess(emptyToUndefined, z.string().min(3).optional()),

		password: z.string().min(6, {
			message: 'Password must be at least 6 characters.',
		}),
	})
	.refine(({ emailAddress, userName }) => !!emailAddress || !!userName, {
		message: 'Enter a username or email address.',
		path: ['emailAddress'],
	});
