import { z } from 'zod';
import { RegistrationSchema } from '@/shared/zod/user/registrationSchema.js';

import { FoundUserResult } from './read.js';

export type CreateUserFailureReason =
	| 'duplicate_email'
	| 'duplicate_username'
	| 'creation_failed';

export type CreateUserResult =
	| {
			success: true;
			createdUser: FoundUserResult;
	  }
	| {
			success: false;
			reason: CreateUserFailureReason;
			message: string;
	  };
export type UserRegistrationDataType = z.infer<typeof RegistrationSchema>;
