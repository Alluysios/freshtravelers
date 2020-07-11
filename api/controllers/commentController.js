const Comment = require('../models/Comment');
const { validationResult } = require('express-validator');

exports.setBlogUserId = (req, res, next) => {
    // ALLOW NESTED ROUTES
    
    next();
}

exports.getAllComments = async(req, res) => {
    const comments = await Comment.find({}).sort({ date: -1 })
    res.status(200).json(comments)
}

exports.commentOnBlog = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    if(!req.body.blog) req.body.blog = req.params.bid;
    if(!req.body.user) req.body.user = req.user;
    if(!req.body.user) {
        return res.status(400).json({ errors: [{ msg: 'You need to login to comment' }] });
    }
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
}

exports.deleteComment = async(req, res) => {
    await Comment.findByIdAndDelete(req.params.cid);
    const comments = await Comment.find()
    
    res.status(200).json(comments);
}