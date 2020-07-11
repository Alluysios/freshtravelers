const express = require('express');
const postController = require('../controllers/postController');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.route('/:bid')
    .get(postController.getAllPosts)
    .post(blogController.uploadImages, blogController.resizeUploadedImages, postController.createPost);

router.route('/:bid/:pid').delete(postController.deletePost).patch(postController.editPost);

module.exports = router;