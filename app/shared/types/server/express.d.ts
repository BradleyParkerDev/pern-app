import type { File } from 'multer';

declare global {
	namespace Express {
		interface Request {
			file?: File; // for single uploads
			files?: File[] | Record<string, File[]>; // for multiple uploads
		}
	}
}

export {};
