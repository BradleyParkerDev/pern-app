import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const User = pgTable('users', {
	userId: uuid('user_id').primaryKey().defaultRandom().unique(),
	storageId: uuid('storage_id').defaultRandom().unique().notNull(),

	firstName: text('first_name'),
	lastName: text('last_name'),
	emailAddress: text('email_address').unique().notNull(),
	userName: text('user_name').unique().notNull(),
	password: text('password').notNull(),
	lastUpdated: timestamp('last_updated').defaultNow().notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});
