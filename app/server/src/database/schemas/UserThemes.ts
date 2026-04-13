import { pgTable, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { User } from './Users.js';
import { Session } from './Sessions.js';

export const themeEnum = pgEnum('theme', ['light', 'dark']);

export const UserTheme = pgTable('user_themes', {
	themeId: uuid('theme_id').primaryKey().defaultRandom().unique(),
	userId: uuid('user_id').references(() => User.userId, {
		onDelete: 'cascade',
	}),
	sessionId: uuid('session_id').references(() => Session.sessionId, {
		onDelete: 'cascade',
	}),
	theme: themeEnum('theme'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});
