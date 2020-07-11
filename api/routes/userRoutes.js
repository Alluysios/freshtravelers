const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { check }  = require('express-validator');

const router = express.Router();

router.get('/', userController.getAllUser);

router.post('/signup', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    check('passwordConfirm', 'Password Confirm is required').exists()
], authController.signup);
router.post('/login', [
    check('email', 'email is required').exists(),
    check('password', 'password is required').exists()
], authController.login);

router.patch('/', authController.protect, userController.uploadImage, userController.resizeUploadImage, userController.updateMe)

router.route('/:bid')
    .patch(authController.protect, userController.favoriteBlog)
    .delete(authController.protect, userController.unfavoriteBlog);

router.get('/auth', authController.protect, authController.auth);

module.exports = router;