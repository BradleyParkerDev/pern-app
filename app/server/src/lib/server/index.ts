import http from 'http';
import debugModule from 'debug';
import { AddressInfo } from 'net';
import logger from '../logger/index.js';

const debug = debugModule('express:server');
let isServerListening = false; // ✅ Tracks state

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: string) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (
	error: NodeJS.ErrnoException,
	port: string | number | false,
) => {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			logger.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			logger.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = (addressInfo: string | AddressInfo | null) => {
	isServerListening = true;
	if (addressInfo) {
		const bind =
			typeof addressInfo === 'string'
				? 'pipe ' + addressInfo
				: 'port ' + addressInfo.port;

		debug(`Listening on ${bind}`);
	} else {
		debug(`Listening but no address info available`);
	}
};

/**
 * Register shutdown handlers for graceful shutdown.
 */
const registerShutdownHandlers = (server: http.Server) => {
	let shuttingDown = false;
	const FORCE_SHUTDOWN_MS = 5000;

	const shutdown = (signal: string) => {
		if (shuttingDown) return; // 🛡 Already shutting down
		shuttingDown = true;

		logger.info(`🛑 Received ${signal}. Shutting down...`);

		const exitProcess = () => {
			if (signal === 'SIGUSR2') {
				process.kill(process.pid, 'SIGUSR2');
			} else {
				process.exit(0);
			}
		};

		// Force exit if something keeps the event loop alive (e.g., hanging connections)
		const forcedExit = setTimeout(() => {
			logger.warn(
				`⏱️ Force exiting after ${FORCE_SHUTDOWN_MS}ms waiting for shutdown.`,
			);
			exitProcess();
		}, FORCE_SHUTDOWN_MS);
		forcedExit.unref();

		if (isServerListening) {
			server.close(() => {
				clearTimeout(forcedExit);
				logger.info('✅ Server closed.');
				exitProcess();
			});
		} else {
			clearTimeout(forcedExit);
			logger.warn('⚠️ Server was not listening. Exiting.');
			exitProcess();
		}
	};

	process.on('SIGINT', () => shutdown('SIGINT'));
	process.on('SIGTERM', () => shutdown('SIGTERM'));
	process.once('SIGUSR2', () => shutdown('SIGUSR2'));

	process.on('uncaughtException', (err) => {
		logger.error(`Uncaught Exception: ${err.message}`, {
			stack: err.stack,
		});
		shutdown('uncaughtException');
	});

	process.on('unhandledRejection', (reason: unknown) => {
		let message: string;

		if (reason instanceof Error) {
			message = reason.message;
		} else {
			message = String(reason);
		}

		logger.error(`Unhandled Rejection: ${message}`);
		shutdown('unhandledRejection');
	});
};

export const serverUtil = {
	normalizePort,
	onError,
	onListening,
	registerShutdownHandlers,
};
