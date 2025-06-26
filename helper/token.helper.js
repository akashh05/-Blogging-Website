const jwt = require("jsonwebtoken");

module.exports = {
    sign: async (body, next) => {
        return await jwt.sign(body, process.env.TOKEN_SECRET, {expiresIn: "1h"});
    },
    verify: async (token, next) => {
        try {
            return await jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (error) {
            console.error("Token verification error:", error);
            return null;
        }
    },
    decode: async (token, next) => {
        try {
            return await jwt.decode(token);
        } catch (error) {
            console.error("Token decode error:", error);
            return null;
        }
    }
}