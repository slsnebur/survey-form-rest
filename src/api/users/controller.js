const {User} = require('./model');
const bcrypt = require('bcryptjs');

// GET

// Returns all users
const getUsers = async ({ query }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Returns user by it's id
const getUser = async ({ query }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Returns user's comments
const getUserComments = async ({ query }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// POST
// Creates new user
const createUser = async ({ body }, res, next) => {
    try {
        body.password = await bcrypt.hash(body.password, 12);
        const user = await User.create(body);
        return res.status(201).json({
            "_id": user._id,
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email,
            "group": user.group
            });
    } catch (e) {
        return next(e);
    }
};

// PUT

// Updates user by id
const updateUser = async ({body, params}, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// DELETE

// Deletes user by id
const destroyUser = async ({params}, res, next) => {
    res.json({message: 'This method has not been implemented'});
};
// Drops all user's comments
const destroyUserComments = async ({params}, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

module.exports = {
    getUsers,
    getUser,
    getUserComments,
    createUser,
    updateUser,
    destroyUser,
    destroyUserComments
};