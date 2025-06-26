var express = require('express');
var router = express.Router();
const blogRoute = require("./blog");
const userRoute = require("./user.route");
const { userModel, blogModel } = require("../model");
const blog = require('../model/blog');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const user_count  = await userModel.count();
  const blog_count = await blogModel.count();
  const genre_count = await blogModel.find().distinct("genres");

  res.render('index', { title: 'BLOGIFY', user_count, blog_count, genre_count: genre_count.length });
});


router.use('/blog', blogRoute);
router.use("/user", userRoute);

module.exports = router;
