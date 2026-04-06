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
	UpdateUserDataType,
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
	async updateUserData(userUpdates: UpdateUserDataType) {
		// Implementation for updating user data goes here






    console.log(userUpdates)
    // try {
        const response = await db.update(User)
            .set(userUpdates)
            .where(eq(User.userId, userUpdates.userId))
            .returning({ updatedUser: {...User} });

        console.log(response)

		return response;

    //     if (response.length === 0) {
    //         return res.status(404).json({ success: false, message: "User not found" });
    //     }


    //     return res.status(200).json({ success: true, message: 'User updated successfully.', response });
    // } catch (error) {
    //     console.error("Error updating user:", error);
    //     return res.status(500).json({ success: false, message: "Error updating user", error });
    // }









	},
	async deleteUserData(
		userId?: string,
		requestToPermanentlyDeleteUserAccount?: string,
	) {
		// Implementation for deleting user data goes here
		if (!userId) return null;

		// Delete dependent sessions first to satisfy FK constraints.
		await db.delete(Session).where(eq(Session.userId, userId));

		return await db.delete(User).where(eq(User.userId, userId)).returning();
	},
};
