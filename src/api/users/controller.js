const {User} = require('./model');
const bcrypt = require('bcryptjs');
const {sign} = require('../../services/jwt')


// GET

// Gets the user id based on the received token


// Returns all users
const getUsers = async ({ query }, res, next) => {
    try {
        // Pagination options
        let pageOptions = {
            page: query.page || 0,
            limit: 5
        };
        await User.find({}, function(err, users) {
            let userMap = {};

            users.forEach(function(user) {
                userMap[user.user_id] = {
                    user_id: user.user_id,
                    username: user.username,
                    email: user.email,
                    group: user.group
                };
            });
            res.status(200).json(userMap);
        }).limit(pageOptions.limit).skip(pageOptions.page * pageOptions.limit);
    } catch (e) {
        return next(e);
    }
};

// Returns user by it's id
const getUser = async ({ params }, res, next) => {
    const id = {user_id: params.id};
    try {
        const user = await User.findOne(id);
        if(user) {
            userLocal = {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                group: user.group
            };
            return res.status(200).json(userLocal);
        }
        return res.status(404).json({error: 'User not found'});
    } catch (e) {
        return next(e);
    }
};

//TODO
// Returns user's comments
const getUserComments = async ({ query }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// POST

//TODO 400 missing or invalid data, 409 username with same email exists
// Creates new user
const createUser = async ({ body }, res, next) => {
    try {
        body.password = await bcrypt.hash(body.password, 12);
        const user = await User.create(body);
        return res.status(201).json({
                user: user.view(),
                token: sign(user)
            });
    } catch (e) {
        if(e.name === 'MongoError' && e.code === 11000) {
            return res.status(409).json({
               message: 'Email already registered'
            });
        }
        next(e);
    }
};

// Login
const loginUser = async (req, res, next) => {
    const user = req.user;
    const token = sign(user);

    return res.json({token: token});
};

// PUT

// Updates user by id
const updateUser = async ({body, params}, res, next) => {
    const id = {user_id: params.id};
    const {username, email, password} = body;
    try {
        const user = await User.findOne(id);
        if(user){
            user.username = username;
            user.email = email;
            user.password = await bcrypt.hash(password, 12);
            await user.save();
            return res.status(200).json({"message": "User data successfully updated"});
        }
        return res.status(404).json({error: "User not found"});

    } catch (e) {
        next(e)
    }
};

// DELETE

// Deletes user by id
const destroyUser = async ({params}, res, next) => {
    const id = {user_id: params.id};
    try {
        const user = await User.findOne(id);
        if(user){
            await user.remove();
            return res.status(204).end;
        }
        return res.status(404).json({error: "User not found"});

    } catch (e) {
        next(e)
    }
};

//TODO
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
    destroyUserComments,
    loginUser
};