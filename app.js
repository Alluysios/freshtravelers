const express = require('express');
const path = require('path');
const app = express();

const blogRouter = require('./api/routes/blogRoutes');
const postRouter = require('./api/routes/postRoutes');
const userRouter = require('./api/routes/userRoutes');
const commentRouter = require('./api/routes/commentRoutes');
const cors = require('cors');

app.use(express.json({limit: '10kb'}));
app.use(cors());
app.options('*', cors());
app.use('/uploads', express.static('uploads'))

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/comments', commentRouter);

// Serve static files
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

module.exports = app;