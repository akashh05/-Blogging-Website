const { tokenHelper } = require("../helper");

module.exports = {
    loggedIn: async (req, res, next) => {
        try {
            const token = req.cookies['token'];
            if (!token) {
                res.locals.loggedIn = false;
                res.locals.admin = false;
                return next();
            }
            
            const decoded = await tokenHelper.verify(token, next);
            if (!decoded) {
                res.locals.loggedIn = false;
                res.locals.admin = false;
                return next();
            }
            
            const userId = decoded.userId;
            const role = decoded.role;
            
            if (!userId) {
                res.locals.loggedIn = false;
                res.locals.admin = false;
            } else {
                res.locals.loggedIn = true;
                if (role === "ADMIN") {
                    res.locals.admin = true;
                } else {
                    res.locals.admin = false;
                }
            }
            next();
        } catch (error) {
            console.error("LoggedIn middleware error:", error);
            res.locals.loggedIn = false;
            res.locals.admin = false;
            next();
        }
    }
}