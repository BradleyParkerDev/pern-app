import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { User } from './Users.js';

// Define UserSession table
export const Session = pgTable('sessions', {
	sessionId: uuid('session_id').primaryKey().defaultRandom().unique(), // UUID v4 primary key for the session
	userId: uuid('user_id').references(() => User.userId), // Foreign key that references userId in the users table
	startTime: timestamp('start_time').defaultNow().notNull(), // Automatically sets current timestamp on creation
	expirationTime: timestamp('expiration_time').notNull(), // Expiration timestamp for session
});
