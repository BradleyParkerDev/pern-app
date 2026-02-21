import dotenv from 'dotenv';
import { HttpError } from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createError from 'http-errors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import apiRouter from './routes/api.js';
import webRouter from './routes/web.js';
import { cronService } from '@server/services/cron/index.js';
import middleware from '@server/middleware/index.js';
// Load environment variables from .env file
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'production';
const openapi = JSON.parse(
	fs.readFileSync(path.resolve(process.cwd(), 'openapi.json'), 'utf-8'),
);

/**
 * Creates and configures the Express application.
 * Includes middleware, routes, and error handling.
 *
 * @module app
 * @returns {express.Application} Configured Express app instance
 */
const app = express();

/**
 * Enable CORS to allow cross-origin requests from the React frontend.
 */
app.use(
	cors({
		origin: 'http://localhost:4001', // React app's URL
		credentials: true, // Allow cookies and other credentials
	}),
);

/**
 * Enable JSON and URL-encoded body parsing.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Enable cookie parsing middleware.
 */
app.use(cookieParser());

/**
 * Serve client assets and build artifacts (JS/CSS)
 */
app.use(
	'/fonts',
	express.static(path.resolve(process.cwd(), 'app/client/public/fonts')), //this works in production but not in dev
);

app.use(
	'/assets',
	express.static(path.resolve(process.cwd(), 'app/client/public/assets')), //this works in production but not in dev
);

if (NODE_ENV === 'production') {
	app.use(
		'/static',
		express.static(path.resolve(process.cwd(), 'app/client/dist/static'), {
			maxAge: '1y',
			immutable: true,
		}),
	);
}

/**
 * Register primary application routes.
 * @route /docs/
 * @route /api/
 * @route /
 */
if (NODE_ENV === 'development') {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));
}

// Quiet asset probes from chrome dev tools
app.get('/favicon.ico', (_req, res) => res.sendStatus(204));
app.get('/.well-known/appspecific/com.chrome.devtools.json', (_req, res) =>
	res.sendStatus(204),
);

/**
 * Session middleware (after static/probe routes to avoid auth checks on assets).
 */
app.use(middleware.session);

app.use('/api', apiRouter);
app.use('*', webRouter);

/**
 * Middleware to catch 404 Not Found and forward to error handler.
 */
app.use((req, res, next) => {
	next(createError(404));
});

/**
 * Centralized error handling middleware.
 *
 * @param err - The error object, which may include status and message.
 * @param req - The incoming request.
 * @param res - The outgoing response.
 */
app.use((err: unknown, req: express.Request, res: express.Response) => {
	let status = 500;
	let message = 'Internal Server Error';

	if (err && typeof err === 'object' && 'status' in err && 'message' in err) {
		const typedErr = err as HttpError;
		status = typedErr.status || 500;
		message = typedErr.message;
	}

	res.status(status).json({
		message,
		error: req.app.get('env') === 'development' ? err : {},
	});
});

/**
 * Default export: the configured Express app.
 */

cronService.startAll();
export default app;
