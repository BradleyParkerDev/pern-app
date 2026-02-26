import { FoundUserType } from '@shared/types/server/auth/index.js';

export type UserState = Pick<
	FoundUserType,
	'firstName' | 'lastName' | 'emailAddress' | 'userName'
>;
