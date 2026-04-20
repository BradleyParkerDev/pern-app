import { uploadLogsToS3Bucket } from './jobs/uploadLogsToS3Bucket.js';
import { pruneExpiredUserSessions } from './jobs/pruneExpiredUserSession.js';
import { loggerFactory } from '@server/lib/logger/index.js';

const startAll = () => {
	loggerFactory.cron?.info?.('[CRON] Starting cron jobs...');

	pruneExpiredUserSessions();
	// uploadLogsToS3Bucket();

	loggerFactory.cron?.info?.('[CRON] Cron jobs initialized.');
};

export const cronService = {
	pruneExpiredUserSessions,
	startAll,
};
