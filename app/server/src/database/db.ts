///////////////////////////////////////////////////////////////////////
// Unified DB Connection (Neon or Local)
///////////////////////////////////////////////////////////////////////
import dotenv from 'dotenv';
import * as schema from './schemas/index.js';

import pg from 'pg';
import { drizzle as drizzleLocal } from 'drizzle-orm/node-postgres';

import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

// Load environment variables from .env file
dotenv.config();

export const useNeon = process.env.USE_NEON === 'true';

const getConnectionString = (
	key: 'LOCAL_DATABASE_URL' | 'NEON_DATABASE_URL',
) => {
	const connectionString = process.env[key] as string | undefined;
	if (!connectionString) {
		throw new Error(`Environment variable ${key} is not defined`);
	}
	return connectionString;
};

let db: ReturnType<typeof drizzleLocal> | ReturnType<typeof drizzleNeon>;

if (useNeon) {
	neonConfig.webSocketConstructor = ws; // required for Neon in Node
	const connectionString = getConnectionString('NEON_DATABASE_URL');
	const pool = new NeonPool({ connectionString });
	db = drizzleNeon(pool, { schema, logger: true });
} else {
	const connectionString = getConnectionString('LOCAL_DATABASE_URL');
	const pool = new pg.Pool({ connectionString });
	db = drizzleLocal(pool, { schema, logger: true });
}

export { db };
