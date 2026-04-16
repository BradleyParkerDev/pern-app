import { Request, Response } from 'express';
import { loggerFactory } from '@server/lib/logger/index.js';
import { reactHelper } from '@server/services/helpers/index.js';
import { createPageContextHelper } from '../helpers/pageContext/pageContextHelper.js';
import { type UserThemeType } from '@shared/types/common/UserThemeType.js';
import { UserTheme } from '@server/database/schemas/UserThemes.js';
import { db } from '@server/database/db.js';
import { eq } from 'drizzle-orm';
export const createUiService = (req: Request, res: Response) => {
	const page = createPageContextHelper(req, res);

	const uiService = {
		req,
		res,
		page,
		react: reactHelper,

		async handlePageRendering() {
			const userTheme = await this.getUserTheme();
			await this.page.loadAppDataIntoRedux(userTheme);

			if (this.react.streamHtml) {
				await this.react.renderAppToPipeableStream(this.page);
			} else {
				const html = await this.react.renderAppToString(this.page);
				this.res.status(200).send(html);
			}

			const ignored = new Set([
				// '/favicon.ico',
				'/.well-known/appspecific/com.chrome.devtools.json',
			]);

			const pathToLog =
				this.req.originalUrl.replace(/\/+($|\?)/, '$1') || '/';

			if (!ignored.has(pathToLog)) {
				const sessionId = this.req.body.sessionId ?? 'unknown';
				const userId = this.req.body.userId ?? 'guest';

				loggerFactory.index.info(
					`GET - ${pathToLog} - sessionId: ${sessionId} - userId: ${userId}`,
				);
			}
		},
		async getUserTheme(): Promise<UserThemeType> {
			const { userId, sessionId } = this.req.body;

			if (userId) {
				const [userTheme] = await db
					.select()
					.from(UserTheme)
					.where(eq(UserTheme.userId, userId));

				return userTheme?.theme ?? 'light';
			}

			if (sessionId) {
				const [userTheme] = await db
					.select()
					.from(UserTheme)
					.where(eq(UserTheme.sessionId, sessionId));

				return userTheme?.theme ?? 'light';
			}

			return 'light';
		},

		async updateTheme(): Promise<UserThemeType | null> {
			const { userId, sessionId, theme } = this.req.body;

			if (!theme) {
				return null;
			}

			if (userId) {
				const [updatedUserTheme] = await db
					.update(UserTheme)
					.set({ theme })
					.where(eq(UserTheme.userId, userId))
					.returning();

				return updatedUserTheme?.theme ?? null;
			}

			if (sessionId) {
				const [updatedUserTheme] = await db
					.update(UserTheme)
					.set({ theme })
					.where(eq(UserTheme.sessionId, sessionId))
					.returning();

				return updatedUserTheme?.theme ?? null;
			}

			return null;
		},
	};

	return uiService;
};
