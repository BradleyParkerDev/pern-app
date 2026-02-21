import { db } from './db.js';
import { User } from './schemas/Users.js';

const firstNames = [
	'Avery',
	'Jordan',
	'Riley',
	'Casey',
	'Morgan',
	'Quinn',
	'Parker',
	'Reese',
	'Hayden',
	'Rowan',
];

const lastNames = [
	'Smith',
	'Johnson',
	'Brown',
	'Taylor',
	'Anderson',
	'Thomas',
	'Jackson',
	'White',
	'Harris',
	'Martin',
];

const randomItem = <T>(items: T[]) =>
	items[Math.floor(Math.random() * items.length)];

const toSlug = (value: string) =>
	value.toLowerCase().replace(/[^a-z0-9]+/g, '');

const makeUser = (index: number) => {
	const firstName = randomItem(firstNames);
	const lastName = randomItem(lastNames);
	const base = `${toSlug(firstName)}.${toSlug(lastName)}`;
	const unique = `${base}${Date.now().toString(36)}${index}`;

	return {
		firstName,
		lastName,
		emailAddress: `${unique}@example.com`,
		userName: unique,
		password: `password-${unique}`,
	};
};

const main = async () => {
	const countArg = process.argv[2];
	const countEnv = process.env.SEED_COUNT;
	const count = Number(countArg ?? countEnv ?? 10);

	if (!Number.isFinite(count) || count <= 0) {
		throw new Error('Seed count must be a positive number');
	}

	const userRows = Array.from({ length: count }, (_, i) => makeUser(i + 1));

	await db.insert(User).values(userRows);

	console.log(`Seeded ${count} user${count === 1 ? '' : 's'}`);
};

main().catch((error) => {
	console.error('Seeding failed:', error);
	process.exit(1);
});
