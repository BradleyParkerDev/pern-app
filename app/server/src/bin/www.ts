#!/usr/bin/env node
// import register from 'module-alias'
// register.addAlias('@server', __dirname + '/src')

import dotenv from 'dotenv';
import app from '../app.js';
import http from 'http';
import { serverUtil } from '../lib/server/index.js';
import logger from '@server/lib/logger/index.js';
import { loggerFactory } from '@server/lib/logger/index.js';

// Load environment variables
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'production';
const STREAM_HTML = process.env.STREAM_HTML || 'false';

/**
 * Get port from environment variables and store in Express.
 */
const port = serverUtil.normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', (error) => {
	serverUtil.onError(error, port);
});
server.on('listening', () => {
	const addressInfo = server.address();
	serverUtil.onListening(addressInfo);
	logger.info(`[NODE_ENV] ${NODE_ENV}`);
	logger.info(`[EXPRESS] Server started on port ${port}.`);

	if (STREAM_HTML === 'true') {
		loggerFactory.ui.info(`[EXPRESS] Streaming html.`);
	} else {
		loggerFactory.ui.info(`[EXPRESS] Sending pre-rendered html pages.`);
	}
	serverUtil.registerShutdownHandlers(server); // 🔥 Register graceful shutdown hooks
});
