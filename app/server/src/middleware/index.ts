import { Request, Response, NextFunction } from 'express';
import { createAuthService } from '@server/services/auth/authService.js';

const middleware = {
	async session(req: Request, res: Response, next: NextFunction) {
		const accessToken: string = req.cookies['sessionCookie'];
		const auth = createAuthService(req, res);
		await auth.authCheck(accessToken);
		next();
	},
};

export default middleware;
