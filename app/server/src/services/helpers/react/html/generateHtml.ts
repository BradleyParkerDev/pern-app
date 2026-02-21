import fs from 'fs';
import path from 'path';
import { generateScripts } from './scripts/generateScripts.js';
import type { AppRootState } from '@shared/types/server/redux/index.js';
import type { RouterContext } from '@shared/types/server/react/index.js';

export const generateHtml = (
	ssrHtmlFromReact: string,
	routerContext: RouterContext,
	appState: AppRootState,
) => {
	// Remove leading/trailing whitespace that would create stray text nodes
	const sanitizedSsrHtml = String(ssrHtmlFromReact).trim();

	// 2. Create HTML template
	let htmlTemplate = fs.readFileSync(
		path.resolve('app/server/src/services/helpers/react/ssr.html'),
		'utf8',
	);

	// 3. Insert React ssr
	htmlTemplate = htmlTemplate.replace('%%SSR_HTML%%', sanitizedSsrHtml);

	// 4. Insert hydration scripts
	const scripts = generateScripts(routerContext, appState);

	htmlTemplate = htmlTemplate.replace('%%CSS%%', scripts.css);

	htmlTemplate = htmlTemplate.replace('%%JS%%', scripts.js);
	htmlTemplate = htmlTemplate.replace(
		'%%VITE_DEV_SERVER%%',
		scripts.viteDevServer,
	);
	htmlTemplate = htmlTemplate.replace(
		'%%HYDRATION_SCRIPTS%%',
		scripts.hydrationScripts,
	);
	return htmlTemplate;
};
