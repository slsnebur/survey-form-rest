const {User} = require('../api/users/model');

module.exports = (req, res, next) => {
    if(!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({
            message: "Missing authorization header"
        });
    }

    const base64credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    User.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.status(401);
        }
        return user.authenticate(password, user.password).then((user) => {
            if(!user) return res.status(403);
            req.user = user;
            next();
        })
    });

};