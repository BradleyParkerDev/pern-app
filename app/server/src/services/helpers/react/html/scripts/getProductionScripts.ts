import fs from 'fs';
import path from 'path';
import type { Scripts } from '@shared/types/server/react/index.js';
import type { AppRootState } from '@shared/types/server/redux/index.js';
import type { RouterContext } from '@shared/types/server/react/index.js';

export const getProductionScripts = (
	routerContext: RouterContext,
	appState: AppRootState,
): Scripts => {
	// Vite writes a manifest mapping original entrypoints to hashed assets.
	// We read it at runtime so SSR can emit the correct bundle URLs.
	let css: string = '';
	let js: string = '';
	let viteDevServer: string = '';
	let hydrationScripts: string = '';

	const manifestPath = path.resolve(
		process.cwd(),
		'app/client/dist/.vite/manifest.json',
	);
	const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
	const entry =
		manifest['index.html'] ||
		(Object.values(manifest).find((item: any) => item && item.isEntry) as
			| { file?: string; css?: string[] }
			| undefined);
	const prodJsBundle = entry?.file;
	if (!entry || !prodJsBundle) {
		throw new Error('Client prodJsBundle not found in manifest.json');
	}

	// Ensure asset URLs are absolute so nested routes (e.g., /user/123) resolve them.
	const toAbsolute = (assetPath: string) =>
		assetPath.startsWith('/') ? assetPath : `/${assetPath}`;

	// If the entry generated CSS, emit it as <link> tags.
	const cssFiles = Array.isArray(entry.css) ? (entry.css as string[]) : [];
	const cssLinks = cssFiles
		.map(
			(href: string) =>
				`<link rel="stylesheet" href="${toAbsolute(href)}">`,
		)
		.join('\n');

	// Inject serialized router hydration data + Redux state, then the client bundle.

	hydrationScripts = `
	<!-- Hydration Data -->
	<script>
window.__ROUTER_CONTEXT__ = ${JSON.stringify(routerContext)};
window.__APPLICATION_STATE__ = ${JSON.stringify(appState)};
</script>`;

	css = cssLinks;
	js = `
<script type="module" src="${toAbsolute(prodJsBundle)}"></script>`;

	const scripts: Scripts = {
		css,
		js,
		viteDevServer,
		hydrationScripts,
	};

	return scripts;
};
