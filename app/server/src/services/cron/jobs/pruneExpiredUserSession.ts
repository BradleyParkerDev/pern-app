import { loggerFactory } from '@server/lib/logger/index.js';
import cron from 'node-cron';

export const pruneExpiredUserSessions = async () => {
	let numSessions = 5;
	cron.schedule('* * * * *', () => {
		loggerFactory.cron.info(
			`[SESSION] 🧹 pruneExpiredUserSessions - ${numSessions} - sessions pruned.`,
		);
	});
};
