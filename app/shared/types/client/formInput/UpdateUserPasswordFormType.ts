// UpdateUserPasswordFormType.ts
import { z } from 'zod';
import { UpdateUserPasswordSchema } from '@shared/zod/user/updateUserPasswordSchema.js';

export type UpdateUserPasswordFormType = z.infer<
	typeof UpdateUserPasswordSchema
>;
