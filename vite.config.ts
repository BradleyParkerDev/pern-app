/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const generateBuildOutput = () => {
	return {
		// Keep build artifacts separate from any static images you might serve manually.
		entryFileNames: 'static/index.[hash].js',
		chunkFileNames: 'static/[name].[hash].js',
		assetFileNames: (assetInfo: any) => {
			if (assetInfo.name && assetInfo.name.endsWith('.css')) {
				return 'static/index.[hash].[ext]';
			}
			return 'static/[name].[hash].[ext]';
		},
	};
};

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const output = generateBuildOutput();
	// Allow configuring the dev server port via environment variable.
	const VITE_PORT = Number(env.VITE_PORT || process.env.VITE_PORT || 4001);
	return {
		root: path.resolve(__dirname, 'app/client'),
		plugins: [react(), tailwindcss()],
		//MAKE VITE DEV SERVER SILENT IN THE CONSOLE
		logLevel: 'silent',
		server: {
			port: VITE_PORT,
			proxy: {
				'/api': env.VITE_API_URL || 'http://localhost:3001',
			},
		},

		resolve: {
			alias: {
				'@client': path.resolve(__dirname, 'app/client/src'),
				'@server': path.resolve(__dirname, 'app/server/src'),
				'@shared': path.resolve(__dirname, 'app/shared/'),
				client: path.resolve(__dirname, 'app/client'), // needed for SSR imports in tests
				'@': path.resolve(__dirname, 'app'),
			},
		},

		build: {
			outDir: path.resolve(__dirname, 'app/client/dist'),
			manifest: true, // ✅ generate manifest.json
			rollupOptions: {
				output,
			},
		},

		test: {
			root: '.',
			include: ['tests/**/*.{test,spec}.{ts,tsx}'],
			globals: true,
			environment: 'node',
		},
	};
});
