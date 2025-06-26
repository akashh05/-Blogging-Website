const { borrowerModel } = require('../model');
const { dbHelper } = require("../helper");

module.exports = {
    purchaseBlog: async (body, next) => {
        try {
            const borrower = await dbHelper.create(borrowerModel, body, next);
            return borrower;
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    },
    findPurchaseBlogById: async (userId, blogId, next) => {
        try {
            return await dbHelper.findOne(borrowerModel, { userId, blogId }, {}, next);
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    },
    findallPurchasedBlogs: async (userId, next) => {
        try {
            return await dbHelper.findAll(borrowerModel, { userId, active: true }, { populate: "blogId" }, next);
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    },
    updateBorrowerBlog: async (userId, blogId, body, next) => {
        try {
            return await dbHelper.update(borrowerModel, body, { userId, blogId }, next);
        } catch (e) {
            console.log(e.toString());
            next(e);
        }
    }
}