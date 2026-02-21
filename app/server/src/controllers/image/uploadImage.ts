import { Request, Response } from 'express';
import { createAuthService } from '../../services/auth/authService.js';
import { loggerFactory } from '@server/lib/logger/index.js';

const uploadImage = async (req: Request, res: Response): Promise<void> => {
	const auth = createAuthService();
	const file = req.file;

	// ✅ Ensure file exists before using it
	if (!file) {
		res.status(400).json({ message: 'No file uploaded.' });
		return;
	}

	const response = await auth.aws.uploadObjectToS3Bucket(file);

	res.status(200).json({
		message: 'File successfully uploaded!',
		response: { ...response },
	});

	loggerFactory.image.info(
		`POST - /api/image/upload-image - image url: ${response.url}`,
	);
};

export default uploadImage;
