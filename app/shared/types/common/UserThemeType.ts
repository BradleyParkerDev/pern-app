// shared/types/common/UserThemeType.ts
import { USER_THEMES } from '@server/database/schemas/UserThemes.js';
export type UserThemeType = (typeof USER_THEMES)[number];
