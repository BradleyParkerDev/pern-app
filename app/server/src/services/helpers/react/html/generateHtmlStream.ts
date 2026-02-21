import fs from 'fs';
import path from 'path';
import { PassThrough } from 'stream';
import { renderToPipeableStream } from 'react-dom/server';
import { generateScripts } from './scripts/generateScripts.js';
import { type Scripts } from '@shared/types/server/react/index.js';

export const generateHtmlStream = async (streamData: any) => {
	const { res, app, routerContext, appState } = streamData;
	// 1) load SSR template
	let template = fs.readFileSync(
		path.resolve('app/server/src/services/helpers/react/ssr.html'),
		'utf8',
	);

	// 2) inject hydration scripts OUTSIDE ROOT
	const scripts: Scripts = generateScripts(routerContext, appState);

	template = template.replace('%%CSS%%', scripts.css);
	template = template.replace('%%JS%%', scripts.js);
	template = template.replace('%%VITE_DEV_SERVER%%', scripts.viteDevServer);
	template = template.replace(
		'%%HYDRATION_SCRIPTS%%',
		scripts.hydrationScripts,
	);

	template = template.replace('%%SSR_HTML%%', '');

	// 3) split around <div id="root">
	const marker = '<div id="root">';
	const idx = template.indexOf(marker);

	if (idx === -1) {
		throw new Error('SSR template missing <div id="root"> marker');
	}

	const before = template.slice(0, idx + marker.length);
	const after = template.slice(idx + marker.length);

	// 4) stream SSR into #root
	const { pipe, abort } = renderToPipeableStream(app, {
		onShellReady() {
			res.status(200).setHeader('Content-Type', 'text/html');
			res.write(before);

			// Pipe React's stream through a PassThrough so we control when the response ends
			const body = new PassThrough();
			pipe(body);
			body.pipe(res, { end: false });

			body.on('end', () => {
				res.write(after);
				res.end();
			});
		},
		onAllReady() {
			// noop: we end the response after the body stream finishes
		},
		onError(err) {
			console.error('SSR streaming error:', err);
			if (!res.headersSent) res.status(500).send('SSR Error');
		},
	});

	// Abort the stream if the client disconnects
	res.on('close', () => abort());
};
