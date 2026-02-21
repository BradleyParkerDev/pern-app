import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const User = pgTable('users', {
	userId: uuid('user_id').primaryKey().defaultRandom().unique(), // UUID v4 primary key
	firstName: text('first_name'), // Nullable text field
	lastName: text('last_name'), // Nullable text field
	emailAddress: text('email_address').unique().notNull(), // Unique and not nullable
	userName: text('user_name').unique().notNull(), // Unique and not nullable
	password: text('password').notNull(), // Password field
	lastUpdated: timestamp('last_updated').defaultNow().notNull(), // Update timestamp on modification
	createdAt: timestamp('created_at').defaultNow().notNull(), // Only set on creation
});
