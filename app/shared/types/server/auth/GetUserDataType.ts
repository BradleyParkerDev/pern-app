import { LoginCredentials } from '@shared/types/server/zod/LoginCredentials.js';

export type GetUserDataType = Partial<LoginCredentials> & {
	userId?: string;
	sessionId?: string;
};
