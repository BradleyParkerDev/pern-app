import {
	LoginCredentials,
	UserRegistrationInput,
	User as UserDataType,
} from '@shared/types/server/zod/index.js';
import authServerUtil from '@server/lib/auth/authServerUtil.js';
import { db } from '@server/database/db.js';
import { User, Session } from '@server/database/schemas/index.js';
import { eq } from 'drizzle-orm';
import {
	FoundUserType,
	GetUserDataType,
	AccessTokenType,
} from '@shared/types/server/auth/index.js';

export const userHelper = {
	async createUser(
		newUserData: Omit<UserRegistrationInput, 'confirmPassword'>,
	) {
		// Implementation for creating a user goes here

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
		await db.insert(User).values(newUser);
		return;
	},
	async getUserData(
		userData: GetUserDataType,
	): Promise<FoundUserType | null> {
		// Implementation for getting user data goes here
		if (userData.userName) {
			const [foundUser] = await db
				.select()
				.from(User)
				.where(eq(User.userName, userData.userName))
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

		if (userData.userId) {
			const [foundUser] = await db
				.select()
				.from(User)
				.where(eq(User.userId, userData.userId))
				.limit(1);
			return foundUser ?? null;
		}

		return null;
	},
	async updateUserData() {
		// Implementation for updating user data goes here
	},
	async deleteUserData(
		userId: string,
		requestToPermanentlyDeleteUserAccount?: string,
	) {
		// Implementation for deleting user data goes here
		return await db.delete(User).where(eq(User.userId, userId)).returning();
	},
};
