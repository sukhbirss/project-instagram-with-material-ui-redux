const express = require('express');
const postController = require('./../controllers/postController');
const authController = require('./../controllers/authController');
const commentRouter = require('./../routers/commentRoutes');

const router = express.Router();



router.use(authController.protect);
router.post('/',postController.post);
router.get('/get',postController.getPosts);
router.get('/mypost',postController.getMyPosts);
router.patch('/like',postController.likes);
router.patch('/unlike',postController.unLikes);
router.delete('/mypost',postController.deleteMyPost);


module.exports = router;
