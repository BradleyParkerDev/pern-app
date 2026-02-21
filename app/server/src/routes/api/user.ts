import express from 'express';
import { userController } from '@server/controllers/index.js';

const router = express.Router();

// User API
router.delete('/delete-user', userController.deleteUser);
router.get('/get-user', userController.getUser);
router.post('/register-user', userController.registerUser);
router.put('/update-user', userController.updateUser);

export default router;
