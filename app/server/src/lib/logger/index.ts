import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
/**
 * Resolves the current filename in ESM.
 * Equivalent to `__filename` in CommonJS.
 */
const __filename = fileURLToPath(import.meta.url);

/**
 * Resolves the current directory name in ESM.
 * Equivalent to `__dirname` in CommonJS.
 */
const __dirname = path.dirname(__filename);

/**
 * Directory where log files are stored.
 * Relative to project root: `./logs/YYYY-MM-DD`
 */
const baseLogDirectory = path.join(__dirname, '../../../../../../../logs'); // root directory
const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const logDirectory = path.join(baseLogDirectory, currentDate);

// Create the logs directory (and dated subdirectory) if it doesn't exist
fs.mkdirSync(logDirectory, { recursive: true });

/**
 * Winston log format configuration.
 * Includes timestamp and uppercase log level.
 */
const logFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.printf(({ timestamp, level, message }) => {
		return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
	}),
);

/**
 * Main Winston logger for general server events.
 * Logs are saved to `logs/server.log`.
 */
const logger = winston.createLogger({
	level: 'info',
	format: logFormat,
	transports: [
		new winston.transports.File({
			filename: path.join(logDirectory, `server.log`),
		}),
		...(process.env.NODE_ENV !== 'production'
			? [new winston.transports.Console()]
			: []),
	],
});

/**
 * Creates a new Winston logger for a specific domain or feature.
 * Logs are saved to `logs/{loggerName}.log`.
 *
 * @param loggerName - A label for the logger (e.g., "auth", "user", "cronJobs").
 * @returns A configured Winston logger instance.
 */
const createNewLogger = (
	loggerName: string,
	logSubDirectory?: string,
): winston.Logger => {
	const sanitizedSubdir = logSubDirectory
		? logSubDirectory.replace(/^[/\\]+/, '')
		: undefined;
	const logFileLocation = sanitizedSubdir
		? path.join(logDirectory, sanitizedSubdir)
		: logDirectory;

	fs.mkdirSync(logFileLocation, { recursive: true });

	return winston.createLogger({
		level: 'info',
		format: logFormat,
		transports: [
			new winston.transports.File({
				filename: path.join(`${logFileLocation}`, `${loggerName}.log`),
			}),
			...(process.env.NODE_ENV !== 'production'
				? [new winston.transports.Console()]
				: []),
		],
	});
};

/**
 * Centralized logger registry for domain-specific loggers.
 *
 * - `auth`: For authentication routes and services
 * - `user`: For user-related operations
 * - `index`: For root routes or startup events
 * - `cron`: For background cron job logs
 */
export const loggerFactory = {
	auth: createNewLogger('auth', 'routes/api'),
	user: createNewLogger('user', 'routes/api'),
	image: createNewLogger('image', 'routes/api'),
	index: createNewLogger('web', 'routes'),
	authService: createNewLogger('auth', 'services'),
	cron: createNewLogger('cron', 'services'),
	ui: createNewLogger('ui', 'services'),
};

// Export the main logger as default
export default logger;
