import dotenv from 'dotenv';
import { getProductionScripts } from './getProductionScripts.js';
import { getViteDevServerScripts } from './getViteDevServerScripts.js';
import { type Scripts } from '@shared/types/server/react/index.js';
import type { AppRootState } from '@shared/types/server/redux/index.js';
import type { RouterContext } from '@shared/types/server/react/index.js';
// Load environment variables from .env file
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'production';

export const generateScripts = (
	routerContext: RouterContext,
	appState: AppRootState,
): Scripts => {
	if (NODE_ENV === 'production') {
		const scripts = getProductionScripts(routerContext, appState);
		return scripts;
	} else {
		const scripts = getViteDevServerScripts(routerContext, appState);
		return scripts;
	}
};
