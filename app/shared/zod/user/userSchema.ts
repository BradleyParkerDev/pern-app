import { z } from 'zod';

export const UserSchema = z.object({
	userId: z.string().optional(), // Backend will fill this in
	firstName: z.string().min(1).optional(),
	lastName: z.string().min(1).optional(),
	emailAddress: z.string().email(),
	userName: z.string().min(3),
	lastUpdated: z.string().datetime().optional(),
});
