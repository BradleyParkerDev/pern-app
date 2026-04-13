import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { User } from './Users.js';

export const UserProfileImage = pgTable('user_profile_images', {
	profileImageId: uuid('profile_image_id')
		.primaryKey()
		.defaultRandom()
		.unique(),
	userId: uuid('user_id')
		.notNull()
		.references(() => User.userId, { onDelete: 'cascade' }),
	imageUrl: text('image_url').notNull(),
	altText: text('alt_text'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});
