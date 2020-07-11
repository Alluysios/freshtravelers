const multer = require('multer');
const sharp = require('sharp');
const Blog = require('../models/Blog');

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Not an image!'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: multerFilter
})

exports.resizeUploadedImages = async(req, res, next) => {
    if(req.files !== undefined && req.files.image) {
        req.body.image = `blogCover-${Date.now()}.jpeg`;
        let width = 2000;
        let height = 1333;

        try {
            await sharp(req.files.image[0].buffer)
                .resize(width, height, { fit: sharp.fit.inside, withoutEnlargement: true })
                .jpeg({ quality: 95 })
                .toFile(`uploads/blogs/${req.body.image}`);
        } catch(err) {
            console.log(err)
        }
    }

    if(req.files.images) {
        req.body.images = [];
        try {
            await Promise.all(req.files.images.map(async(file, i ) => {
                const filename = `blogPosts-${Date.now()}-${i + 1}.jpeg`;
                let width = 1050;
                let height = 700;
                await sharp(file.buffer)
                    .resize(width, height, { fit: 'inside', withoutEnlargement: true })
                    .jpeg({ quality: 95 })
                    .toFile(`uploads/blogs/${filename}`);
    
                req.body.images.push(filename);
            }))
        } catch(err) {
            console.log(err);
        }
    }

    next();
}

exports.uploadImages = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 15 }
])

exports.getAllBlogs = async(req, res) => {
    let filter = {};
    const blogs = await Blog.find(filter).populate('post', 'title description').populate('comments');

    res.status(200).json(blogs);
}

exports.getBlog = async(req, res) => {
    const blog = await Blog.findById(req.params.bid).populate('comments');

    res.status(200).json(blog);
}

exports.createBlog = async(req, res) => {
    const { tags } = req.body;
    req.body.tags = tags.trim().split(',');

    const blog = await Blog.create(req.body);

    res.status(201).json(blog);
}

exports.editBlog = async(req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.bid, req.body);
    
    res.json(blog);
}

exports.deleteBlog = async(req, res) => {
    await Blog.findByIdAndDelete(req.params.bid);
    
    const blogs = await Blog.find({}).populate('post', 'title description');

    res.json(blogs)
}

exports.getAllPostImages = async(req, res) => {
    const imagesByPosts = await Blog.aggregate([
        { $unwind: "$posts" },
        {
            $group: {
                _id: "$posts",
            }
        },
    ])

    const images = imagesByPosts.map(post => {
        return post._id.images;
    }).join(',').split(',');
    
    res.status(200).json(images)
}