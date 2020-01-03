const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = ({body}, res, next) => {
    try {
        const token = body.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {maxAge: config.jwtExpiration});

        body.user = {user_id: decoded.user_id};
        next();
    } catch (e) {
        console.error('Invalid token');
        res.status(401).end();
    }
};