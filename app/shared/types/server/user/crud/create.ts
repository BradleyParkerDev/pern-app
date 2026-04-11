import { z } from 'zod';
import { UserRegistrationSchema } from '@shared/zod/user/userRegistrationSchema.js';

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
export type UserRegistrationDataType = z.infer<typeof UserRegistrationSchema>;
