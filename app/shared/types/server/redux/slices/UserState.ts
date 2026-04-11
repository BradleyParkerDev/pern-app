import { FoundUserResult } from '@shared/types/server/user/index.js';

export type UserState = Pick<
	FoundUserResult,
	'firstName' | 'lastName' | 'emailAddress' | 'userName'
>;
