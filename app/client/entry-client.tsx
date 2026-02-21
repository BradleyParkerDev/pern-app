// app/client/entry-client.tsx
import { hydrateRoot, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from '@shared/redux/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@shared/reactRouter/index.js';
import './index.css';
import type { AppRootState } from '@shared/types/server/redux/index.js';
import type { RouterContext } from '@shared/types/server/react/index.js';

// Vite Dev Server ping Express
if (import.meta.env.DEV) {
	import('@client/services/dev/pingBackend.js');
}

// Read payloads
const routerContext: RouterContext = (window as any).__ROUTER_CONTEXT__;
const appState: AppRootState = (window as any).__APPLICATION_STATE__;

// Recreate router with routerContext
const router = createBrowserRouter(routes, {
	hydrationData: routerContext,
});

// Recreate redux store with appState
const store = createStore(appState);

// Build app tree
const rootElement = document.getElementById('root')!;
const app = (
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);

// Hydrate OR render
if (rootElement.hasChildNodes()) {
	hydrateRoot(rootElement, app);
} else {
	createRoot(rootElement).render(app);
}
