import express from 'express';
import multer from 'multer';
import { imageController } from '@server/controllers/index.js';

const router = express.Router();

// upload to memory
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Define routes
router.post(
	'/upload-image',
	upload.single('file'),
	imageController.uploadImage,
);
router.delete('/delete-image', imageController.deleteImage);

export default router;
