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

		// Sessions
		SESSION_MODE: string;
		SESSION_SHORT_MINUTES: number;
		SESSION_MEDIUM_MINUTES: number;
		SESSION_LONG_DAYS: number;

		// Add other environment variables here
	}
}
