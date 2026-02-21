import type { ReactElement } from 'react';
import type { RouterContext } from '@shared/types/server/react/index.js';
import type { AppRootState } from '@shared/types/server/redux/index.js';

export type RenderResult = {
	app: ReactElement;
	routerContext: RouterContext;
	appState: AppRootState;
};
