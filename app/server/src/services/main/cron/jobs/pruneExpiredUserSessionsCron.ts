import cron from 'node-cron';
import { lt } from 'drizzle-orm';
import { db } from '@server/database/db.js';
import { Session } from '@server/database/schemas/index.js';
import { loggerFactory } from '@server/lib/logger/index.js';

export const pruneExpiredUserSessionsCron = async () => {
	cron.schedule('*/5 * * * *', async () => {
		const now = new Date();

		loggerFactory.cron?.info?.(
			`[CRON][Session] Checking for expired sessions at ${now.toISOString()}`,
		);

		try {
			const expiredSessions = await db
				.select()
				.from(Session)
				.where(lt(Session.expirationTime, now));

			const sessionsDeleted = expiredSessions.length;

			if (sessionsDeleted > 0) {
				await db.delete(Session).where(lt(Session.expirationTime, now));

				loggerFactory.cron?.info?.(
					`[CRON][Session] Deleted ${sessionsDeleted} expired session(s).`,
				);
			} else {
				loggerFactory.cron?.info?.(
					'[CRON][Session] No expired sessions found.',
				);
			}
		} catch (error) {
			loggerFactory.cron?.error?.(
				`[CRON][Session] Error while deleting expired sessions: ${
					error instanceof Error ? error.message : String(error)
				}`,
			);
		}
	});
};
