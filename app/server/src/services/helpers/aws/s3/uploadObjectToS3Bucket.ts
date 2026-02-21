import {
	PutObjectCommand,
	S3Client,
	S3ServiceException,
} from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const appName = process.env.APP_NAME ?? 'express-server';
const bucketName = process.env.AWS_S3_BUCKET!;
const bucketRegion = process.env.AWS_REGION!;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const cdnDomain = process.env.AWS_CLOUDFRONT_DOMAIN;

const s3Client = new S3Client({
	region: bucketRegion,
	credentials: {
		accessKeyId,
		secretAccessKey,
	},
});

interface UploadFileOptions {
	buffer: Buffer;
	mimetype: string;
	originalname: string;
	prefix?: string;
}

export const uploadObjectToS3Bucket = async ({
	buffer,
	mimetype,
	originalname,
	prefix = 'images',
}: UploadFileOptions) => {
	const key = `${appName}/${prefix}/${originalname}`;
	const command = new PutObjectCommand({
		Bucket: bucketName,
		Key: key,
		Body: buffer,
		ContentType: mimetype,
	});

	try {
		await s3Client.send(command);

		// Return CDN-based URL if available
		const url = cdnDomain
			? `${cdnDomain}/${key}`
			: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${key}`;

		return { success: true, key, url };
	} catch (error) {
		if (error instanceof S3ServiceException) {
			console.error(`S3 upload failed: ${error.name} - ${error.message}`);
		} else {
			console.error('Unknown upload error:', error);
		}
		throw error;
	}
};
