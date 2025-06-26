require("dotenv").config(); // load env file
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import your blog model
const Blog = require('./model/blog'); // Correct path to your blog model file

// Import the index router
const indexRouter = require('./routes/index');

// Import the aboutService
const aboutService = require('./services/about.service');

// Import the sampleBlogsService
const sampleBlogsService = require('./services/sampleblogs.service');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Make MongoDB connection
 */
(async () => {
    await mongoose.connect('mongodb://localhost:27017/blog123', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
})();

// Set up Handlebars as the view engine
app.engine('hbs', engine({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Use the index router
app.use('/', indexRouter);

// Define a route to handle the like action
// Define a route to handle the like/dislike action
app.post('/blog/like/:id', async (req, res, next) => {
    try {
        const blogId = req.params.id;

        // Find the blog post by its ID
        const blog = await Blog.findById(blogId);

        // Toggle the like state
        if (blog.likes === 0) {
            // If the blog is currently unliked, like it
            blog.likes = 1;
        } else {
            // If the blog is currently liked, unlike it
            blog.likes = 0;
        }

        // Save the updated blog post
        await blog.save();

        res.status(200).json({ message: 'Blog like/dislike toggled successfully' });
    } catch (error) {
        console.error('Error toggling like/dislike for blog:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Define a route handler to render the about.hbs template
app.get('/about', async (req, res, next) => {
    try {
        // Fetch any dynamic data needed for the about page from the aboutService
        const aboutData = await aboutService.getAboutData();

        // Render the about.hbs template with the fetched data
        res.render('about', { year: new Date().getFullYear(), ...aboutData });
    } catch (error) {
        next(error);
    }
});

// Define a route handler to handle DELETE requests to delete a blog post
app.delete('/blog/delete/:id', async (req, res, next) => {
    try {
        // Extract the blog post ID from the request parameters
        const { id } = req.params;

        // Use Mongoose to find the blog post by ID and delete it
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            // If the blog post with the given ID doesn't exist, return a 404 Not Found error
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // If the blog post was successfully deleted, send a success response
        res.json({ message: 'Blog post deleted successfully', deletedBlog });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
});

// Define a route handler to render sampleblogs.hbs
app.get('/sampleblogs', async (req, res, next) => {
    try {
        // Fetch sample blogs and magazines data using sampleBlogsService
        const blogs = await sampleBlogsService.fetchBlogs();
        // const magazines = await sampleBlogsService.fetchMagazines();

        // Render the sampleblogs.hbs template with the fetched data
        res.render('sampleblogs', { blogs });
    } catch (error) {
        next(error);
    }
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
}); 

// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
