const { userService, borrowerService } = require("../services");
const bcrypt = require("bcrypt");
const { tokenHelper } = require("../helper");

module.exports = {
    getLoginForm: (req, res) => {
        res.render("form/login");
    },
    getSignUpForm: (req, res) => {
        res.render("form/signup");
    },
    getProfile: async (req, res, next) => {
        try {
            const userId = req.userId;
            const user = await userService.findUserById(userId);
            
            // Try to get purchased blogs, but don't fail if there's an error
            let allPurchasedBlogs = [];
            try {
                allPurchasedBlogs = await borrowerService.findallPurchasedBlogs(userId, next) || [];
            } catch (borrowError) {
                console.log("No purchased blogs found or error occurred:", borrowError.message);
                allPurchasedBlogs = [];
            }
            
            res.render("pages/profile", { 
                blogs: allPurchasedBlogs, 
                user: { name: user.name, batch: user.batch, email: user.email } 
            });
        } catch (error) {
            console.error("Profile error:", error);
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const {
                email,
                password
            } = req.body;
            
            const user = await userService.findUserByEmail(email, next);
            if (!user) {
                res.locals.message = "User does not exist with this email.";
                return res.redirect("/user/login");
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.locals.message = "Incorrect password.";
                return res.redirect("/user/login");
            }
            
            const userId = user._id;
            const token = await tokenHelper.sign({ userId: userId, role: user.role }, next);
            
            await userService.updateUser({ token: token }, userId, next);
            
            res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 1 });
            return res.redirect("/user/profile");
        } catch (error) {
            console.error("Login error:", error);
            res.locals.message = "An error occurred during login.";
            return res.redirect("/user/login");
        }
    },
    signup: async (req, res, next) => {
        try {
            const {
                email,
                password
            } = req.body;
            
            const user = await userService.findUserByEmail(email, next);
            if (user) {
                res.locals.message = "User already exists.";
                return res.redirect("/user/signup");
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
            const newUser = await userService.createUser(req.body, next);
            return res.redirect("/user/login");
        } catch (error) {
            console.error("Signup error:", error);
            res.locals.message = "An error occurred during signup.";
            return res.redirect("/user/signup");
        }
    },
    logout: async (req, res, next) => {
        try {
            res.cookie("token", "", { maxAge: 0 });
            return res.redirect("/user/login");
        } catch (error) {
            next(error);
        }
    }
}