const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');
const { check }  = require('express-validator');

const router = express.Router({ mergeParams: true });

router.route('/').get(commentController.getAllComments);
router.route('/').post(authController.protect, [
    check('user', 'Please login to comment').exists()
], commentController.commentOnBlog)
router.route('/:cid').patch(commentController.deleteComment);

module.exports = router;