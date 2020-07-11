const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A blog must have a title']
    },
    description: {
        type: String,
        required: [true, 'A blog must have a description']
    },
    destination: {
        type: String,
        enum: {
            values: ['NA', 'ASIA', 'AFRICA', 'OCEOANIA', 'EUROPE'],
            message: 'Destination available: NA, ASIA, AFRICA, OCEOANIA, EUROPE'
        }
    },
    image: {
        type: String,
        default: 'defaultblog.jpeg'
    },
    images: [String],
    posts: [
        {
            title: {
                type: String,
                required: [true, 'Post must have a title']
            },
            food: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
                required: [true, 'Post must have a description']
            },
            subdescription: String,
            image: String,
            images: [String],
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

blogSchema.virtual('comments', {
    // Name of the model
    ref: 'Comment',
    // field names
    foreignField: 'blog',
    localField: '_id'
})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;