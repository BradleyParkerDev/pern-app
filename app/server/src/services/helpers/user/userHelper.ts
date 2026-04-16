import {
	UserRegistrationDataType,
	CreateUserResult,
	GetUserDataType,
	FoundUserResult,
	UpdateUserDataType,
	UpdateUserResult,
	DeleteUserDataType,
	DeleteUserResult,
} from '@shared/types/server/user/index.js';
import authServerUtil from '@server/lib/auth/authServerUtil.js';
import { db } from '@server/database/db.js';
import {
	User,
	Session,
	UserTheme,
	UserProfileImage,
} from '@server/database/schemas/index.js';
import { eq } from 'drizzle-orm';

export const userHelper = {
	async createUser(
		newUserData: Omit<UserRegistrationDataType, 'confirmPassword'>,
	): Promise<CreateUserResult> {
		const existingEmailUser = await db
			.select()
			.from(User)
			.where(eq(User.emailAddress, newUserData.emailAddress))
			.limit(1);

		if (existingEmailUser[0]) {
			return {
				success: false,
				reason: 'duplicate_email',
				message: 'Email address is already in use.',
			};
		}

		const existingUsernameUser = await db
			.select()
			.from(User)
			.where(eq(User.userName, newUserData.userName))
			.limit(1);

		if (existingUsernameUser[0]) {
			return {
				success: false,
				reason: 'duplicate_username',
				message: 'Username is already in use.',
			};
		}

		const hashedPassword = await authServerUtil.hashPassword(
			newUserData.password,
		);

		const newUser = {
			emailAddress: newUserData.emailAddress,
			userName: newUserData.userName,
			password: hashedPassword,
			...(newUserData.firstName && { firstName: newUserData.firstName }),
			...(newUserData.lastName && { lastName: newUserData.lastName }),
		};

		const createdUser = await db.transaction(async (tx) => {
			const createdUsers = await tx
				.insert(User)
				.values(newUser)
				.returning();
			const user = createdUsers[0] ?? null;

			if (!user) {
				throw new Error('Failed to create user.');
			}

			await tx.insert(UserTheme).values({
				userId: user.userId,
			});

			await tx.insert(UserProfileImage).values({
				userId: user.userId,
				imageUrl: null,
			});

			return user;
		});
		return {
			success: true,
			createdUser,
		};
	},

	async getUserData(
		userData: GetUserDataType,
	): Promise<FoundUserResult | null> {
		if (userData.userId) {
			const [foundUser] = await db
				.select()
				.from(User)
				.where(eq(User.userId, userData.userId))
				.limit(1);
			return foundUser ?? null;
		}

		if (userData.emailAddress) {
			const [foundUser] = await db
				.select()
				.from(User)
				.where(eq(User.emailAddress, userData.emailAddress))
				.limit(1);
			return foundUser ?? null;
		}

		if (userData.userName) {
			const [foundUser] = await db
				.select()
				.from(User)
				.where(eq(User.userName, userData.userName))
				.limit(1);
			return foundUser ?? null;
		}

		return null;
	},

	async updateUserData(
		userUpdates: UpdateUserDataType,
	): Promise<UpdateUserResult> {
		if (!userUpdates.userId) {
			return {
				success: false,
				reason: 'missing_user_id',
				message: 'User is not authenticated.',
			};
		}

		const existingUser = await db
			.select()
			.from(User)
			.where(eq(User.userId, userUpdates.userId))
			.limit(1);

		const foundUser = existingUser[0] ?? null;

		if (!foundUser) {
			return {
				success: false,
				reason: 'not_found',
				message: 'User not found.',
			};
		}

		// Password update branch
		if (
			'newPassword' in userUpdates ||
			'confirmedNewPassword' in userUpdates
		) {
			if (
				!('currentPassword' in userUpdates) ||
				!userUpdates.currentPassword
			) {
				return {
					success: false,
					reason: 'missing_current_password',
					message: 'Current password is required.',
				};
			}

			if (
				!('newPassword' in userUpdates) ||
				!('confirmedNewPassword' in userUpdates) ||
				!userUpdates.newPassword ||
				!userUpdates.confirmedNewPassword
			) {
				return {
					success: false,
					reason: 'missing_password_confirmation',
					message:
						'New password and confirmed new password are required.',
				};
			}

			if (userUpdates.newPassword !== userUpdates.confirmedNewPassword) {
				return {
					success: false,
					reason: 'password_mismatch',
					message:
						'New password and confirmed new password must match.',
				};
			}

			const passwordMatches = await authServerUtil.validatePassword(
				userUpdates.currentPassword,
				foundUser.password,
			);

			if (!passwordMatches) {
				return {
					success: false,
					reason: 'invalid_current_password',
					message: 'Current password is incorrect.',
				};
			}

			const hashedPassword = await authServerUtil.hashPassword(
				userUpdates.newPassword,
			);

			const updatedUsers = await db
				.update(User)
				.set({ password: hashedPassword })
				.where(eq(User.userId, userUpdates.userId))
				.returning();

			return {
				success: true,
				updatedUser: updatedUsers[0],
			};
		}

		// Profile update branch
		const { userId, sessionId, ...profileUpdates } = userUpdates;

		if (Object.keys(profileUpdates).length === 0) {
			return {
				success: false,
				reason: 'no_updates_provided',
				message: 'No update fields were provided.',
			};
		}

		const updatedUsers = await db
			.update(User)
			.set(profileUpdates)
			.where(eq(User.userId, userId))
			.returning();

		return {
			success: true,
			updatedUser: updatedUsers[0],
		};
	},

	async deleteUserData(
		userDeletionData: DeleteUserDataType,
	): Promise<DeleteUserResult> {
		if (!userDeletionData.userId) {
			return {
				success: false,
				reason: 'missing_user_id',
				message: 'User is not authenticated.',
			};
		}

		if (userDeletionData.confirmation !== 'permanently delete') {
			return {
				success: false,
				reason: 'missing_confirmation',
				message: 'Type "permanently delete" to delete your account.',
			};
		}

		await db
			.delete(Session)
			.where(eq(Session.userId, userDeletionData.userId));

		const deletedUsers = await db
			.delete(User)
			.where(eq(User.userId, userDeletionData.userId))
			.returning();

		const deletedUser = deletedUsers[0] ?? null;

		if (!deletedUser) {
			return {
				success: false,
				reason: 'not_found',
				message: 'User not found.',
			};
		}

		return {
			success: true,
			deletedUser,
		};
	},
};
