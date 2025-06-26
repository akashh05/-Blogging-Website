const Blog = require('../model/blog');
const { dbHelper } = require("../helper");

module.exports = {
    getAllBlogs: async (next) => {
        try {
            const blogs = await dbHelper.findAll(Blog, {}, {}, next);
            return blogs;
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    },
    addBlog: async (body, next) => {
        try {
            const blog = await dbHelper.create(Blog, body, next);
            return blog;
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    },
    findBlogById: async (blogId, next) => {
        try {
            const blog = await dbHelper.findOne(Blog, { _id: blogId }, {}, next);
            return blog;
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    },
    updateBlog: async (blogId, data, next) => {
        try {
            await dbHelper.updateOne(Blog, { _id: blogId }, data, next);
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    },
    deleteBlog: async (blogId, next) => {
        try {
            await dbHelper.deleteOne(Blog, { _id: blogId }, next);
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    }
};
