const { sampleBlogsService } = require("../services");
const bcrypt = require("bcrypt");
const { tokenHelper } = require("../helper");

module.exports = {
    getSampleBlogsPage: async (req, res, next) => {
        try {
            const blogs = await fetchBlogs();
            res.render("sampleblogs", { blogs });
        } catch (error) {
            next(error); 
        }
    },
}
 