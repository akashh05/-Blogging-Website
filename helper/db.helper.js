module.exports = {
    findOne: async (Model, filter, options = {}, next) => {
        try {
            if (Object.keys(options).length > 0) {
                if (options?.populate) {
                    return await Model.findOne(filter, {}, { sort: { 'createdAt': -1 } }).populate(options?.populate);
                }
            }
            return await Model.findOne(filter, {}, { sort: { 'createdAt': -1 } });
        } catch (error) {
            console.error("Database findOne error:", error);
            throw error;
        }
    },
    findAll: async (Model, filter = {}, options = {}, next) => {
        try {
            if (Object.keys(options).length > 0) {
                if (options?.populate) {
                    console.log('populate');
                    return await Model.find(filter).populate(options?.populate);
                }
            }
            return await Model.find(filter);
        } catch (error) {
            console.error("Database findAll error:", error);
            throw error;
        }
    },
    create: async (Model, body, next) => {
        try {
            return await Model.create(body);
        } catch (error) {
            console.error("Database create error:", error);
            throw error;
        }
    },
    delete: async (Model, filter, next) => {
        try {
            return await Model.deleteOne(filter);
        } catch (error) {
            console.error("Database delete error:", error);
            throw error;
        }
    },
    update: async (Model, body, filter, next) => {
        try {
            return await Model.updateOne(filter, { $set: body });
        } catch (error) {
            console.error("Database update error:", error);
            throw error;
        }
    }
}