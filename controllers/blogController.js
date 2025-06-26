
const Blog = require('../models/blog');

exports.updateBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { blog_name, cover_image, author_name, genres, blog_link } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
      blog_name,
      cover_image,
      author_name,
      genres,
      blog_link,
      cover_description
    }, { new: true }); 

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.redirect(`/blog/${blogId}`);
  } catch (error) {
    next(error);
  }
};
