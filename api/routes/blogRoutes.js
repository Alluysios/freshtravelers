const express = require('express');
const blogController = require('../controllers/blogController');
const commentRouter = require('../routes/commentRoutes');

const router = express.Router();

// use comment router if it encounter a route like /:bid/comments
router.use('/:bid/comments', commentRouter);

router.get('/getPostImages', blogController.getAllPostImages);

router.route('/')
    .get(blogController.getAllBlogs)
    .post(blogController.uploadImages, blogController.resizeUploadedImages, blogController.createBlog);

router.route('/:bid')
    .get(blogController.getBlog)
    .patch(blogController.uploadImages, blogController.resizeUploadedImages, blogController.editBlog)
    .delete(blogController.deleteBlog);

module.exports = router;