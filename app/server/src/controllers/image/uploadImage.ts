import { Request, Response } from 'express';
import { createAuthService } from '@server/services/index.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import {
	type APIResponseType,
	HTTPStatus,
} from '@shared/types/common/index.js';

const uploadImage = async (req: Request, res: Response): Promise<void> => {
	try {
		const auth = createAuthService();
		const file = req.file;
		const { userId, storageId } = ((req as any).authContext ?? {}) as {
			userId?: string;
			storageId?: string;
		};

		if (!userId || !storageId) {
			const response: APIResponseType<null> = {
				success: false,
				message: 'User is not authenticated.',
				statusCode: HTTPStatus.UNAUTHORIZED,
				data: null,
			};

			res.status(HTTPStatus.UNAUTHORIZED).json(response);
			return;
		}

		if (!file) {
			const response: APIResponseType<null> = {
				success: false,
				message: 'No file uploaded.',
				statusCode: HTTPStatus.BAD_REQUEST,
				data: null,
			};

			res.status(HTTPStatus.BAD_REQUEST).json(response);
			return;
		}

		loggerFactory.image.info(
			`POST - /api/image/upload-image - storageId: ${storageId} - file: ${file.originalname}`,
		);

		const result = await auth.aws.uploadObjectToS3Bucket({
			buffer: file.buffer,
			mimetype: file.mimetype,
			originalname: file.originalname,
			prefix: 'profile-images',
			storageId,
		});

		if (!result.success || !result.data) {
			const response: APIResponseType<null> = {
				success: false,
				message: result.message,
				statusCode: result.statusCode,
				data: null,
			};

			res.status(result.statusCode).json(response);
			return;
		}

		const [dbResult] = await auth.image.saveUserProfileImage(
			userId,
			result.data.url,
			result.data.key,
		);
		loggerFactory.image.info(
			`upload-image dbResult: ${JSON.stringify(dbResult)}`,
		);

		if (!dbResult) {
			const response: APIResponseType<null> = {
				success: false,
				message:
					'Image uploaded to storage, but failed to save image metadata.',
				statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
				data: null,
			};

			res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
			return;
		}

		const response: APIResponseType<{
			imageKey: string | null;
			imageUrl: string | null;
		}> = {
			success: true,
			message: 'Image uploaded successfully.',
			statusCode: HTTPStatus.OK,
			data: {
				imageKey: dbResult?.imageKey,
				imageUrl: dbResult?.imageUrl,
			},
		};

		res.status(HTTPStatus.OK).json(response);

		loggerFactory.image.info(
			`POST - /api/image/upload-image - storageId: ${storageId} - imageKey: ${dbResult.imageKey} - url: ${dbResult.imageUrl}`,
		);
	} catch (error) {
		loggerFactory.image.error(
			`POST - /api/image/upload-image - error: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);

		const response: APIResponseType<null> = {
			success: false,
			message: 'Failed to upload image.',
			statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
			data: null,
		};

		res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
	}
};

export default uploadImage;
