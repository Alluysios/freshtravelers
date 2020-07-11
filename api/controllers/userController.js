const User = require('../models/User');
const Blog = require('../models/Blog');

const multer = require('multer');
const sharp = require('sharp');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '/uploads/users')
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${Math.round(Math.random() * 1E9)}-${Date.now}.${ext}`);
//     }
// });

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image!'), false);
    }
}

const upload = multer({ storage: storage, fileFilter: multerFilter });

exports.resizeUploadImage = async(req, res, next) => {
    if(req.file) {
        req.body.image = `blog-${Date.now()}.jpeg`;
        let width = 400; let height = 400;
        try {
            await sharp(req.file.buffer)
                .resize(width, height)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`uploads/users/${req.body.image}`)
        } catch(err) {
            console.log(err);
        }
    }
    next();
}

exports.uploadImage = upload.single('image');

exports.getAllUser = async(req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}

exports.updateMe = async(req, res) => {
    const user = await User.findOneAndUpdate({ email: req.user.email}, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        image: req.body.image,
        email: req.body.email
    }, { returnOriginal: false });

    res.status(200).json(user);
}

exports.favoriteBlog = async(req, res) => {
    const user = await User.findById(req.user.id);
    const blog = await Blog.findById(req.params.bid).select('title');
    // check if user exist
    if(!user) {
        return res.status(400).json({ msg: 'You are not Logged In.' });
    }
    // check if there is a blog
    if(!req.params.bid) {
        return res.status(400).json({ msg: 'Blog Unavailable' });
    }
    const { favorites } = user;
    if(favorites.includes(req.params.bid)) {
        return res.status(400).json({ msg: 'Blog already favorited' });
    }
    favorites.push(blog);
    await user.save();
    
    res.status(200).json(user);
}


exports.unfavoriteBlog = async(req, res) => {
    const user = await User.findById(req.user.id);
    // check if user exist
    if(!user) {
        return res.status(400).json({ msg: 'You are not Logged In.' });
    }
    // check if there is a blog
    if(!req.params.bid) {
        return res.status(400).json({ msg: 'Blog Unavailable' });
    }
    const { favorites } = user;
    const blogIndex = favorites.findIndex(id => req.params.bid === id);
    favorites.splice(blogIndex, 1);
    await user.save();
    
    res.status(204).json(user);
}