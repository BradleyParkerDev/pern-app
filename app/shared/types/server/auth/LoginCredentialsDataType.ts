import { z } from 'zod';
import { LoginSchema } from '@shared/zod/auth/loginSchema.js';
export type LoginCredentialsDataType = z.infer<typeof LoginSchema>;
