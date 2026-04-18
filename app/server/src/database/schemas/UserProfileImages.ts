import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { User } from './Users.js';

export const UserProfileImage = pgTable('user_profile_images', {
	userProfileImageId: uuid('user_profile_image_id')
		.defaultRandom()
		.primaryKey(),

	userId: uuid('user_id')
		.notNull()
		.references(() => User.userId, {
			onDelete: 'cascade',
		})
		.unique(),

	imageUrl: text('image_url'),
	imageKey: text('image_key'),

	createdAt: timestamp('created_at').defaultNow().notNull(),

	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});
