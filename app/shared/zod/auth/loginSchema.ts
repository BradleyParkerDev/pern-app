import { z } from 'zod';

import { UserSchema } from '../user/userSchema.js';
const emptyToUndefined = (val: unknown) =>
	typeof val === 'string' && val.trim() === '' ? undefined : val;

export const LoginSchema = z
	.object({
		// emailAddress: UserSchema.shape.emailAddress.optional(),
		// userName: UserSchema.shape.userName.optional(),
		emailAddress: z.preprocess(
			emptyToUndefined,

			UserSchema.shape.emailAddress.optional(),
		),

		userName: z.preprocess(
			emptyToUndefined,

			UserSchema.shape.userName.optional(),
		),
		password: z.string().min(6, {
			message: 'Password must be at least 6 characters.',
		}),
	})
	.refine(
		({ emailAddress, userName }) =>
			!!emailAddress?.trim?.() || !!userName?.trim?.(),

		{
			message: 'Enter a username or email address.',
			path: ['emailAddress'],
		},
	);
