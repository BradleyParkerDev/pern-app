import type { UIUtility } from './UIUtility.js';
import type { AuthUtility } from './AuthUtility.js';
import type { UserUtility } from './UserUtility.js';

export type { UIUtility } from './UIUtility.js';
export type { AuthUtility } from './AuthUtility.js';
export type { UserUtility } from './UserUtility.js';

export type AppOutletContext = {
	ui: UIUtility;
	auth: AuthUtility;
	user: UserUtility;
};
