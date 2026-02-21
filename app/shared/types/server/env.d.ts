declare namespace NodeJS {
	interface ProcessEnv {
		APP_NAME: string;
		APP_ENV: string;
		NODE_ENV: string;
		PORT: string;
		STREAM_HTML: string;
		VITE_PORT: number;
		UI_APP_NAME: string;
		SALT_ROUNDS: number;
		USE_NEON: string;
		NEON_DATABASE_URL: string;
		LOCAL_DATABASE_URL: string;
		JWT_SECRET_KEY: string;

		// Add other environment variables here
	}
}
