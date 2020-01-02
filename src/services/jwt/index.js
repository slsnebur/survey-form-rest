const jwt = require("jsonwebtoken");
const config = require("../../config");

const sign = (user) => {
    const options = {
        expiresIn: config.jwtExpiration
    };

    return jwt.sign({
        user_id: user.user_id
    }, process.env.JWT_SECRET, options)
};

console.log(process.env.JWT_SECRET);

module.exports = {
    sign
};