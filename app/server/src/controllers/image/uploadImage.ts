// import { Request, Response } from 'express';
// import { createAuthService } from '../../services/auth/authService.js';
// import { loggerFactory } from '@server/lib/logger/index.js';

// const uploadImage = async (req: Request, res: Response): Promise<void> => {
// 	const auth = createAuthService();
// 	const file = req.file;
// 	const userId = req.body.userId;
// 	// ✅ Ensure file exists before using it
// 	if (!file) {
// 		res.status(400).json({ message: 'No file uploaded.' });
// 		return;
// 	}

// 	const response = await auth.aws.uploadObjectToS3Bucket(file);

// 	res.status(200).json({
// 		message: 'success',
// 		response: { ...response },
// 	});

// 	loggerFactory.image.info(
// 		`POST - /api/image/upload-image - image url: ${response.url}`,
// 	);
// };

// export default uploadImage;
import { Request, Response } from 'express';
import { createAuthService } from '../../services/auth/authService.js';
import { loggerFactory } from '@server/lib/logger/index.js';
import {
	type APIResponseType,
	HTTPStatus,
} from '@shared/types/common/index.js';

const uploadImage = async (req: Request, res: Response): Promise<void> => {
	try {
		const auth = createAuthService();
		const file = req.file;

		const userId = (req as any).authContext?.userId;

		loggerFactory.image.info(
			`POST - /api/image/upload-image - incoming userId: ${userId ?? 'missing'} - file: ${
				file?.originalname ?? 'missing'
			}`,
		);

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

		if (!userId) {
			const response: APIResponseType<null> = {
				success: false,
				message: 'User ID is required to upload an image.',
				statusCode: HTTPStatus.BAD_REQUEST,
				data: null,
			};

			res.status(HTTPStatus.BAD_REQUEST).json(response);
			return;
		}

		const result = await auth.aws.uploadObjectToS3Bucket({
			buffer: file.buffer,
			mimetype: file.mimetype,
			originalname: file.originalname,
			prefix: 'profile-images',
			userId: String(userId),
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

		// Save uploaded image URL to DB AFTER successful upload
		await auth.image.saveUserProfileImage(String(userId), result.data.url);

		const response: APIResponseType<{
			key: string;
			url: string;
		}> = {
			success: true,
			message: 'Image uploaded successfully.',
			statusCode: HTTPStatus.OK,
			data: {
				key: result.data.key,
				url: result.data.url,
			},
		};

		res.status(HTTPStatus.OK).json(response);

		loggerFactory.image.info(
			`POST - /api/image/upload-image - userId: ${userId} - key: ${result.data.key} - url: ${result.data.url}`,
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
