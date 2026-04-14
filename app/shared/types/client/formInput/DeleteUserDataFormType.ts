// DeleteUserDataFormType.ts
import { z } from 'zod';
import { DeleteUserDataSchema } from '@shared/zod/user/deleteUserDataSchema.js';

export type DeleteUserDataFormType = z.input<typeof DeleteUserDataSchema>;
