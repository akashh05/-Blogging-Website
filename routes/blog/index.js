var express = require('express');
var router = express.Router();
const Blog = require('../../model/blog');
const { blogController } = require("../../controllers");
const { authMiddleware, authrorizationMiddleware, loggedInMiddleware } = require("../../middlewares");

/* GET home page. */
router.get('/', loggedInMiddleware.loggedIn, blogController.displayBlogs);
router.get('/add-blog', loggedInMiddleware.loggedIn, authMiddleware.auth, authrorizationMiddleware.isAdmin, blogController.addBlogForm);
router.post('/add-blog', loggedInMiddleware.loggedIn, authMiddleware.auth, authrorizationMiddleware.isAdmin, blogController.addBlog);
router.post('/purchase/:blogId', loggedInMiddleware.loggedIn, authMiddleware.auth, blogController.purchaseBlog);
router.get('/return/:blogId', loggedInMiddleware.loggedIn, authMiddleware.auth, blogController.returnBlog);
router.get('/edit/:blogId', loggedInMiddleware.loggedIn, authMiddleware.auth, blogController.editBlogForm);
router.post('/edit/:blogId', loggedInMiddleware.loggedIn, authMiddleware.auth, blogController.editBlog);


module.exports = router;
