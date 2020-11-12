const express = require('express');
const commentController = require('./../controllers/commentController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect)

router
	.route('/')
	.post(commentController.postComment);



module.exports = router; 