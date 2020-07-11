const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    blog: {
        type: mongoose.Schema.ObjectId,
        ref: 'Blog'
    },
    date: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

commentSchema.pre(/^find/, function(next) {
    this.populate('user', 'firstname lastname image');
    next();
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;