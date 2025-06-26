const {returModel} = require('../model');
const { dbHelper } = require("../helper");

module.exports = {
    returnBlog: async (body, next) => {
        try {
            const returned = await dbHelper.create(returModel, body, next);
            return returned;
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    },
    findreturnBlogById: async (userId, blogId, next) => {
        try {
            return await dbHelper.findOne(returModel, {userId, blogId}, {}, next);
        } catch(e) {
            console.log(e.toString());
            next(e);
        }
    }
}