const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();


router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgotpassword',authController.forgotPassword);
router.post('/resetpassword',authController.resetPassword);
router.post('/alluser',userController.getAllUser);

router.use(authController.protect);
router.post('/',userController.getUser);
router.post('/profile/:id',userController.getUserData);
router.patch('/follow',userController.addFollower);
router.patch('/unfollow',userController.unfollow);
router.post('/follower',userController.getFollower);
router.post('/following',userController.getFollowing);
router.patch('/updateme',userController.updateMe);

module.exports = router;