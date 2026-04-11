import { FoundUserResult } from './read.js';

export type UpdateProfileDataType = {
	userId: string;
	sessionId?: string;
	emailAddress?: string;
	userName?: string;
	firstName?: string;
	lastName?: string;
};

export type UpdatePasswordDataType = {
	userId: string;
	sessionId?: string;
	currentPassword: string;
	newPassword: string;
	confirmedNewPassword: string;
};

export type UpdateUserDataType = UpdateProfileDataType | UpdatePasswordDataType;

export type UpdateUserFailureReason =
	| 'missing_user_id'
	| 'missing_current_password'
	| 'missing_password_confirmation'
	| 'password_mismatch'
	| 'invalid_current_password'
	| 'not_found'
	| 'no_updates_provided';

export type UpdateUserResult =
	| {
			success: true;
			updatedUser: FoundUserResult;
	  }
	| {
			success: false;
			reason: UpdateUserFailureReason;
			message: string;
	  };
