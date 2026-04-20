import express from 'express';
import { pageContentController } from '@server/controllers/index.js';

const router = express.Router();

// Page Content API
router.get('/homepage-content', pageContentController.getHomePageContent);
router.get('/chat', pageContentController.getChatPageContent);
router.get('/friends', pageContentController.getFriendsPageContent);
router.get('/images', pageContentController.getImagesPageContent);
router.get('/news', pageContentController.getNewsPageContent);
router.get('/store', pageContentController.getStorePageContent);
router.get('/userpage-content', pageContentController.getUserPageContent);

export default router;
