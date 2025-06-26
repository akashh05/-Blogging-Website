const { tokenHelper } = require("../helper");

module.exports = {
    auth: async (req, res, next) => {
        try {
            const token = req.cookies['token'];
            if (!token) {
                res.locals.message = "Please login to continue.";
                return res.redirect("/user/login");
            }
            
            const decoded = await tokenHelper.verify(token, next);
            if (!decoded) {
                res.locals.message = "Invalid or expired token. Please login again.";
                res.cookie("token", "", { maxAge: 0 });
                return res.redirect("/user/login");
            }
            
            const userId = decoded.userId;
            const role = decoded.role;
            
            if (!userId) {
                res.locals.message = "Please login to continue.";
                return res.redirect("/user/login");
            }
            
            console.log("userId", userId);
            req.userId = userId;
            req.role = role;
            next();
        } catch (error) {
            console.error("Auth middleware error:", error);
            res.locals.message = "Authentication error. Please login again.";
            res.cookie("token", "", { maxAge: 0 });
            return res.redirect("/user/login");
        }
    }
}