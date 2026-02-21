import type { InferSelectModel } from 'drizzle-orm';
import type { User } from '@server/database/schemas/Users.js';

export type FoundUserType = InferSelectModel<typeof User>;
