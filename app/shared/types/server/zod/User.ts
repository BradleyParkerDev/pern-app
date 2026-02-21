import { z } from 'zod';
import { UserSchema } from '@shared/zod/user/userSchema.js';
export type User = z.infer<typeof UserSchema>;
