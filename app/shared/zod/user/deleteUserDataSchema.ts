import { z } from 'zod';

export const DeleteUserDataSchema = z.object({
	confirmation: z
		.string()
		.transform((value) => value.trim().toLowerCase())
		.refine((value) => value === 'permanently delete', {
			message: "You must type 'permanently delete' to confirm.",
		}),
});
