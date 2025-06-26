const { blogService, fineService, borrowerService, returnService } = require("../services");

module.exports = {
    displayBlogs: async (req, res, next) => {
        const blogs = await blogService.getAllBlogs(next);
        console.log(res.locals);
        res.render("pages/blogs", { blogs });
    },
    addBlogForm: function (req, res, next) {
        res.render('form/add-blog');
    },
    addBlog: async (req, res, next) => {
        console.log(req.body);
        try {
            const blog = await blogService.addBlog(req.body, next);
            res.redirect("/blog");
        } catch (e) {
            console.log(e.toString());
        }
    },
    purchaseBlog: async (req, res, next) => {
    },
    returnBlog: async (req, res, next) => {
    },
    editBlogForm: async (req, res, next) => {
        const { blogId } = req.params;
        const blog = await blogService.findBlogById(blogId, next);
        res.render('form/edit-blog', { blog });
    },
    editBlog: async (req, res, next) => {
        const { blogId } = req.params;
        try {
            await blogService.updateBlog(blogId, req.body, next);
            res.redirect("/blog");
        } catch (e) {
            console.log(e.toString());
        }
    },
    deleteBlog: async (req, res, next) => {
        const { blogId } = req.params;
        try {
            await blogService.deleteBlog(blogId, next);
            res.redirect("/blog");
        } catch (e) {
            console.log(e.toString());
        }
    }
};
