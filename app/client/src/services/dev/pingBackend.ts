import api from '@shared/axios/index.js';

const devEnvironment = import.meta.env.DEV;

// Only run in Vite dev mode
if (typeof window !== 'undefined' && devEnvironment) {
	api.get('/dev/vite-alive').catch(() => {
		// Fail silently
	});
}
