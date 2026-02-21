import type { AppStore } from '@shared/types/server/redux/index.js';
import { routes } from '@shared/reactRouter/index.js';
import { Provider } from 'react-redux';
import {
	createStaticHandler,
	createStaticRouter,
	StaticRouterProvider,
} from 'react-router-dom';
import type {
	RouterContext,
	RenderResult,
} from '@shared/types/server/react/index.js';

export async function render(
	url: string,
	store: AppStore,
): Promise<RenderResult> {
	const handler = createStaticHandler(routes);
	const request = new Request(url);
	// ⭐ Required so loaders get access to store
	const queryResult = await handler.query(request, {
		requestContext: { store },
	});

	if (queryResult instanceof Response) {
		throw queryResult;
	}

	const context: RouterContext = queryResult;
	const router = createStaticRouter(handler.dataRoutes, context);

	return {
		app: (
			<Provider store={store}>
				<StaticRouterProvider
					router={router}
					context={context}
					hydrate={false}
				/>
			</Provider>
		),
		routerContext: context,
		appState: store.getState(),
	} satisfies RenderResult;
}
