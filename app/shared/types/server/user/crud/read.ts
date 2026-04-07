import type { InferSelectModel } from 'drizzle-orm';
import type { User } from '@server/database/schemas/Users.js';
import { LoginCredentialsDataType } from '@/shared/types/server/auth/LoginCredentialsDataType.js';

export type GetUserDataType = Partial<LoginCredentialsDataType> & {
	userId?: string;
	sessionId?: string;
};

export type FoundUserResult = InferSelectModel<typeof User>;
