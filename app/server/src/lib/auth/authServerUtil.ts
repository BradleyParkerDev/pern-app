import dotenv from 'dotenv';
import { jwtVerify, SignJWT, JWTPayload } from 'jose';
import bcrypt from 'bcrypt';
import { AccessTokenType } from '@shared/types/server/auth/index.js';

// Load environment variables from .env file
dotenv.config();

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? 5);
const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

const authServerUtil = {
	saltRounds: SALT_ROUNDS,
	jwtSecretKey: JWT_SECRET_KEY,
	get expiration() {
		const nowMs = Date.now();
		return {
			sevenDays: nowMs + 7 * 24 * 60 * 60 * 1000,
			thirtyMinutes: nowMs + 30 * 60 * 1000,
			twoMinutes: nowMs + 2 * 60 * 1000,
		};
	},

	async hashPassword(password: string) {
		const salt = await bcrypt.genSalt(this.saltRounds);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	},
	async validatePassword(password: string, hashedPassword: string) {
		const match = await bcrypt.compare(password, hashedPassword);
		return match;
	},
	async generateToken(payload: AccessTokenType): Promise<string> {
		// Generate Access Token
		return await new SignJWT(payload)
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime(payload.exp)
			.sign(this.jwtSecretKey);
	},
	async verifyToken(accessToken: string) {
		if (!accessToken) {
			console.error('No token provided');
			return null;
		}
		try {
			const { payload } = await jwtVerify(
				accessToken,
				this.jwtSecretKey,
				{
					algorithms: ['HS256'],
				},
			);
			return payload;
		} catch (error) {}

		return null;
	},

	generateTokenExpirationTime(
		sessionCreatedAt: number,
		sessionExpiresAt: number,
	) {
		//return expiration for all session lengths based on login time

		return {
			tokenExpiration: sessionExpiresAt - sessionCreatedAt,
		};
	},
};

export default authServerUtil;
