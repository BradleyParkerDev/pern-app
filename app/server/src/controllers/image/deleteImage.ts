import { Request, Response } from 'express';
import { createAuthService } from '@server/services/index.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import {
	type APIResponseType,
	HTTPStatus,
} from '@shared/types/common/index.js';

const deleteImage = async (req: Request, res: Response): Promise<void> => {
	try {
		const auth = createAuthService();
		const userId = (req as any).authContext?.userId;
		const imageKey = req.body?.imageKey;

		loggerFactory.image.info(
			`DELETE - /api/image/delete-image - incoming userId: ${userId ?? 'missing'} - imageKey: ${
				imageKey ?? 'missing'
			}`,
		);

		if (!userId) {
			const response: APIResponseType<null> = {
				success: false,
				message: 'User is not authenticated.',
				statusCode: HTTPStatus.UNAUTHORIZED,
				data: null,
			};

			res.status(HTTPStatus.UNAUTHORIZED).json(response);
			return;
		}

		if (!imageKey) {
			const response: APIResponseType<null> = {
				success: false,
				message: 'Image imageKey is required to delete an image.',
				statusCode: HTTPStatus.BAD_REQUEST,
				data: null,
			};

			res.status(HTTPStatus.BAD_REQUEST).json(response);
			return;
		}

		const result = await auth.aws.deleteObjectInS3Bucket({ key: imageKey });

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

		await auth.image.deleteUserProfileImage(String(userId));

		const response: APIResponseType<{ imageKey: string }> = {
			success: true,
			message: 'Image deleted successfully.',
			statusCode: HTTPStatus.OK,
			data: {
				imageKey: result.data.key,
			},
		};

		res.status(HTTPStatus.OK).json(response);

		loggerFactory.image.info(
			`DELETE - /api/image/delete-image - userId: ${userId} - imageKey: ${result.data.key}`,
		);
	} catch (error) {
		loggerFactory.image.error(
			`DELETE - /api/image/delete-image - error: ${
				error instanceof Error ? error.message : String(error)
			}`,
		);

		const response: APIResponseType<null> = {
			success: false,
			message: 'Failed to delete image.',
			statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
			data: null,
		};

		res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json(response);
	}
};

export default deleteImage;
