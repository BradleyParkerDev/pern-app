declare namespace NodeJS {
	interface ProcessEnv {
		APP_NAME: string;
		APP_ENV: string;
		API_URL: string;
		NODE_ENV: string;
		PORT: string;
		STREAM_HTML: string;
		VITE_PORT: number;
		VITE_API_URL: string;
		UI_APP_NAME: string;
		SALT_ROUNDS: number;
		USE_NEON: string;
		NEON_DATABASE_URL: string;
		LOCAL_DATABASE_URL: string;
		JWT_SECRET_KEY: string;
		NEWS_API_KEY: string;

		// Add other environment variables here
	}
}
