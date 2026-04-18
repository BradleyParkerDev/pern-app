import { pgTable, uuid, timestamp, varchar, text } from 'drizzle-orm/pg-core';
import { User } from './Users.js';

export const Session = pgTable('sessions', {
	sessionId: uuid('session_id').primaryKey().defaultRandom().unique(),

	userId: uuid('user_id').references(() => User.userId),

	startTime: timestamp('start_time').defaultNow().notNull(),
	expirationTime: timestamp('expiration_time').notNull(),

	ipAddress: varchar('ip_address', { length: 45 }),
	userAgent: text('user_agent'),
});
