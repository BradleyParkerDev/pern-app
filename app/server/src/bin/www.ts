#!/usr/bin/env node

import dotenv from 'dotenv';
import http from 'http';
import debugModule from 'debug';
import { AddressInfo } from 'net';

import app from '../app.js';
import logger, { loggerFactory } from '@server/lib/logger/index.js';

// Load environment variables
dotenv.config();

const debug = debugModule('express:server');
const NODE_ENV = process.env.NODE_ENV || 'production';
const STREAM_HTML = process.env.STREAM_HTML || 'false';

let isServerListening = false;

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): number | string | false {
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
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException): void {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

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
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
	isServerListening = true;

	const addressInfo = server.address();

	if (addressInfo) {
		const bind =
			typeof addressInfo === 'string'
				? `pipe ${addressInfo}`
				: `port ${addressInfo.port}`;

		debug(`Listening on ${bind}`);
	} else {
		debug('Listening but no address info available');
	}

	logger.info(`[NODE_ENV] ${NODE_ENV}`);
	logger.info(`[EXPRESS] Server started on port ${port}.`);

	if (STREAM_HTML === 'true') {
		loggerFactory.uiService.info('[EXPRESS] Streaming html.');
	} else {
		loggerFactory.uiService.info(
			'[EXPRESS] Sending pre-rendered html pages.',
		);
	}

	registerShutdownHandlers();
}

/**
 * Register shutdown handlers for graceful shutdown.
 */
function registerShutdownHandlers(): void {
	let shuttingDown = false;
	const FORCE_SHUTDOWN_MS = 5000;

	function shutdown(signal: string): void {
		if (shuttingDown) return;
		shuttingDown = true;

		logger.info(`🛑 Received ${signal}. Shutting down...`);

		const exitProcess = () => {
			if (signal === 'SIGUSR2') {
				process.kill(process.pid, 'SIGUSR2');
			} else {
				process.exit(0);
			}
		};

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
	}

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
		const message =
			reason instanceof Error ? reason.message : String(reason);

		logger.error(`Unhandled Rejection: ${message}`);
		shutdown('unhandledRejection');
	});
}
