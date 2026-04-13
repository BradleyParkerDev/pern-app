import type { InferSelectModel } from 'drizzle-orm';
import type { User } from '@server/database/schemas/Users.js';

export type GetUserDataType = {
	userId?: string;
	sessionId?: string;
	emailAddress?: string;
	userName?: string;
};

export type FoundUserResult = InferSelectModel<typeof User>;
