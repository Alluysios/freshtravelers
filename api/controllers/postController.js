const Blog = require('../models/Blog');

/*
    @ROUTE /api/v1/posts/:bid/:pid
    @DESC GET ALL POSTS
*/
exports.getAllPosts = async(req, res) => {
    const posts = await Blog.findById(req.params.bid).posts;

    res.status(200).json(posts);
}

/*
    @ROUTE /api/v1/posts/:bid/:pid
    @DESC CREATE POST
*/
exports.createPost = async(req, res) => {
    const blog = await Blog.findById(req.params.bid);
    const { posts } = blog;
    const {
        title,
        description,
        subdescription,
        food,
        image,
        images,
        startLocation,
        locations
    } = req.body;

    const newPosts = {
        title,
        description,
        food,
        subdescription,
        image,
        images,
        startLocation,
        locations
    }
    
    posts.push(newPosts)

    await blog.save();

    res.json(blog);
}

/*
    @ROUTE /api/v1/posts/:bid/:pid
    @DESC EDIT POST
*/
exports.editPost = async(req, res) => {
   const blog = await Blog.findById(req.params.bid);
   const { posts } = blog;
   let postIndex = posts.findIndex(post => req.params.pid === post._id.toString());

   posts[postIndex] = req.body;
   
   await blog.save();

   res.status(200).json(blog)
}

/*
    @ROUTE /api/v1/posts/:bid/:pid
    @DESC DELETE POST
*/
exports.deletePost = async(req, res) => {
    const blog = await Blog.findById(req.params.bid);
    const { posts } = blog;
    const postIndex = posts.findIndex(post => req.params.pid === post._id.toString())
    posts.splice(postIndex, 1);

    await blog.save();
    
    res.status(204).json(blog);
}