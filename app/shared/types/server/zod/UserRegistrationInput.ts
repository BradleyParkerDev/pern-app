import { z } from 'zod';
import { UserRegistrationSchema } from '@shared/zod/user/userRegistrationSchema.js';
export type UserRegistrationInput = z.infer<typeof UserRegistrationSchema>;
