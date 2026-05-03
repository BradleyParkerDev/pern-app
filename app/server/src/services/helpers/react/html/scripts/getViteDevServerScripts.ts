import { type Scripts } from '@shared/types/server/react/index.js';
import dotenv from 'dotenv';

dotenv.config();

const VITE_PORT = process.env.VITE_PORT;

export const getViteDevServerScripts = (routerContext: any, appState: any) => {
	let css: string = '';
	let js: string = '';

	const viteDevServer = `
	<!-- React-refresh preamble required by @vitejs/plugin-react -->
<script type="module">
	import RefreshRuntime from "http://localhost:${VITE_PORT}/@react-refresh";

	RefreshRuntime.injectIntoGlobalHook(window);
	window.$RefreshReg$ = () => {};
	window.$RefreshSig$ = () => (type) => type;
	window.__vite_plugin_react_preamble_installed__ = true;
</script>
<!-- Vite Dev Server -->
<script type="module" src="http://localhost:${VITE_PORT}/@vite/client"></script>
<script type="module" src="http://localhost:${VITE_PORT}/entry-client.tsx"></script>

`;

	const hydrationScripts = `
	<!-- Hydration Data -->
	<script>
window.__ROUTER_CONTEXT__ = ${JSON.stringify(routerContext)};
window.__APPLICATION_STATE__ = ${JSON.stringify(appState)};
</script>`;

	const scripts: Scripts = {
		css,
		js,
		viteDevServer,
		hydrationScripts,
	};

	return scripts;
};
