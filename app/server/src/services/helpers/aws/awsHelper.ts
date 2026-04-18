import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
	S3ServiceException,
	waitUntilObjectNotExists,
} from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { type APIResultType, HTTPStatus } from '@shared/types/common/index.js';

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
	storageId?: string;
}

interface DeleteObjectOptions {
	key: string;
}

type UploadObjectResultType = APIResultType<{
	key: string;
	url: string;
} | null>;

type DeleteObjectResultType = APIResultType<{
	key: string;
} | null>;

export const awsHelper = {
	async uploadObjectToS3Bucket({
		buffer,
		mimetype,
		originalname,
		prefix = 'images',
		storageId,
	}: UploadFileOptions): Promise<UploadObjectResultType> {
		const extension = originalname.includes('.')
			? originalname.split('.').pop()
			: '';

		const fileName = extension
			? `profile-image.${extension}`
			: 'profile-image';

		const key = storageId
			? `${appName}/${prefix}/${storageId}/${fileName}`
			: `${appName}/${prefix}/${fileName}`;

		const command = new PutObjectCommand({
			Bucket: bucketName,
			Key: key,
			Body: buffer,
			ContentType: mimetype,
		});

		try {
			await s3Client.send(command);

			const url = cdnDomain
				? `${cdnDomain}/${key}`
				: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${key}`;

			return {
				success: true,
				message: 'Object uploaded successfully.',
				statusCode: HTTPStatus.OK,
				data: {
					key,
					url,
				},
			};
		} catch (error) {
			if (error instanceof S3ServiceException) {
				console.error(
					`S3 upload failed: ${error.name} - ${error.message}`,
				);

				return {
					success: false,
					message: `S3 upload failed: ${error.message}`,
					statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
					data: null,
				};
			}

			console.error('Unknown upload error:', error);

			return {
				success: false,
				message: 'Unknown upload error.',
				statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
				data: null,
			};
		}
	},

	async deleteObjectInS3Bucket({
		key,
	}: DeleteObjectOptions): Promise<DeleteObjectResultType> {
		try {
			await s3Client.send(
				new DeleteObjectCommand({
					Bucket: bucketName,
					Key: key,
				}),
			);

			await waitUntilObjectNotExists(
				{ client: s3Client, maxWaitTime: 30 },
				{ Bucket: bucketName, Key: key },
			);

			return {
				success: true,
				message: 'Object deleted successfully.',
				statusCode: HTTPStatus.OK,
				data: {
					key,
				},
			};
		} catch (error) {
			if (
				error instanceof S3ServiceException &&
				error.name === 'NoSuchBucket'
			) {
				console.error(`Bucket "${bucketName}" does not exist.`);

				return {
					success: false,
					message: `Bucket "${bucketName}" does not exist.`,
					statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
					data: null,
				};
			}

			if (error instanceof S3ServiceException) {
				console.error(
					`S3 delete failed: ${error.name} - ${error.message}`,
				);

				return {
					success: false,
					message: `S3 delete failed: ${error.message}`,
					statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
					data: null,
				};
			}

			console.error('Unknown delete error:', error);

			return {
				success: false,
				message: 'Unknown delete error.',
				statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
				data: null,
			};
		}
	},
};
