import { uploadLogsToS3Bucket } from './jobs/uploadLogsToS3Bucket.js';
import { pruneExpiredUserSessionsCron } from './jobs/pruneExpiredUserSessionsCron.js';
import { loggerFactory } from '@server/lib/logger/index.js';

const startAll = () => {
	loggerFactory.cron?.info?.('[CRON] Starting cron jobs...');
	pruneExpiredUserSessionsCron();
	// uploadLogsToS3Bucket();

	loggerFactory.cron?.info?.('[CRON] Cron jobs initialized.');
};

export const cronService = {
	pruneExpiredUserSessionsCron,
	startAll,
};
