import { uploadLogsToS3Bucket } from './jobs/uploadLogsToS3Bucket.js';
import { pruneExpiredUserSessions } from './jobs/pruneExpiredUserSession.js';

const startAll = () => {
	pruneExpiredUserSessions();
};

export const cronService = {
	pruneExpiredUserSessions,
	startAll,
};
