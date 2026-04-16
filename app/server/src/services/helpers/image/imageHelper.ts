import { UserProfileImage } from '@/server/src/database/schemas/index.js';
import { db } from '@server/database/db.js';
import { eq } from 'drizzle-orm';

export const imageHelper = {
	async saveUserProfileImage(userId: string, imageUrl: string | null) {
		const result = await db
			.update(UserProfileImage)
			.set({ imageUrl })
			.where(eq(UserProfileImage.userId, userId))
			.returning();

		return result;
	},

	async deleteUserProfileImage(userId: string) {},
};
