//////////////////////////////////////////////////////////////////
// Neon and Local Migrations
//////////////////////////////////////////////////////////////////
import { migrate as neonMigrate } from 'drizzle-orm/neon-serverless/migrator';
import { migrate as localMigrate } from 'drizzle-orm/node-postgres/migrator';
import { db, useNeon } from './db.js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

const main = async () => {
	console.log(useNeon);
	// Dynamically assign the migrator
	const migrate = useNeon ? neonMigrate : localMigrate;

	try {
		// Run migrations
		const migrationsFolder = path.resolve(
			process.cwd(),
			'app/server/src/database/migrations',
		);
		await migrate(db, { migrationsFolder });
		console.log('Migrations completed successfully');
	} catch (error) {
		console.error('Error during migrations:', error);
		process.exit(1);
	}
};

main();
