import { z } from 'zod';
import { LoginSchema } from '@shared/zod/auth/loginSchema.js';
export type LoginCredentials = z.infer<typeof LoginSchema>;
