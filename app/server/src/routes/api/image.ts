import express from 'express';
import multer from 'multer';
import { imageController } from '@server/controllers/index.js';

const router = express.Router();

// Multer setup

// upload to memory
const storage = multer.memoryStorage();

// upload to project directory
// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, 'my-images/')
//     },
//     filename: (req, file, cb)=>{
//         cb(null, file.originalname)

//     }

// })
const upload = multer({ storage: storage });

// Define routes
// router.post('/delete-user-image', imageController.deleteUserImage);
router.post(
	'/upload-image',
	upload.single('file'),
	imageController.uploadImage,
);

export default router;
