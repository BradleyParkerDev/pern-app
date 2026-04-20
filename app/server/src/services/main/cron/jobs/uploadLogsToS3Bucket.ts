import fs from 'fs';
import { createAuthService } from '../../auth/authService.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import cron from 'node-cron';

export const uploadLogsToS3Bucket = () => {
	const auth = createAuthService();

	cron.schedule('* * * * *', () => {
		loggerFactory.cron.info(`uploadLogsToS3Bucket`);
	});
};
