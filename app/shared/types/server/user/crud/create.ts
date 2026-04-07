import { z } from 'zod';
import { UserRegistrationSchema } from '@shared/zod/user/userRegistrationSchema.js';
export type UserRegistrationDataType = z.infer<typeof UserRegistrationSchema>;
