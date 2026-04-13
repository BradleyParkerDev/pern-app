import { pgTable, uuid, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { User } from './Users.js';
import { Session } from './Sessions.js';

export const USER_THEMES = ['light', 'dark'] as const;
export const themeEnum = pgEnum('theme', USER_THEMES);

export const UserTheme = pgTable('user_themes', {
	themeId: uuid('theme_id').primaryKey().defaultRandom().unique(),
	userId: uuid('user_id').references(() => User.userId, {
		onDelete: 'cascade',
	}),
	sessionId: uuid('session_id').references(() => Session.sessionId, {
		onDelete: 'cascade',
	}),
	theme: themeEnum('theme').default('light').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	lastUpdated: timestamp('last_updated').defaultNow().notNull(),
});
