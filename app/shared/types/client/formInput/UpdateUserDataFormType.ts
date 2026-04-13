// UpdateUserDataFormType.ts
import { z } from 'zod';
import { UpdateUserDataSchema } from '@shared/zod/user/updateUserDataSchema.js';

export type UpdateUserDataFormType = z.infer<typeof UpdateUserDataSchema>;
