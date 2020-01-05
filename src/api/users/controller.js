const {User} = require('./model');
const {Comment} = require('../comments/model');
const {Form} = require('../forms/model');
const bcrypt = require('bcryptjs');
const {sign} = require('../../services/jwt');


// GET

// Gets the user id and info based on the received token
const showMe = async (req, res, next) => {
    let {user} = req;

    User.findOne({ user_id: user.user_id }).then((usr) => {
        if (usr === null) {
            return res.status(410).json({message: 'User of this user_id is not currently registered'});
        }
        return res.status(200).json({user: usr.view()});
    });
};

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
                    comments_id: user.comments_id,
                    forms_id: user.forms_id,
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

            return res.status(200).json({
                user: user.view()
            });

        }
        return res.status(404).json({error: 'User not found'});
    } catch (e) {
        return next(e);
    }
};

// Returns user's comments
const getUserComments = async (req, res, next) => {
    // Pagination options
    let pageOptions = {
        page: req.query.page || 0,
        limit: 5
    };
    const id = {user_id: req.params.id};
    try {
        const user = await User.findOne(id);
        if(user) {
            await Comment.find({comment_id: {$in : user.comments_id}}, function(err, comments) {
                let commentMap = {};

                comments.forEach(function(comment) {
                    commentMap[comment.comment_id] = {
                        comment_id: comment.comment_id,
                        user_id: comment.user_id,
                        form_id: comment.form_id,
                        username: comment.username,
                        text: comment.text,
                        timestamp: comment.timestamp
                    };
                });
                res.status(200).json(commentMap);
                console.log(pageOptions);
            }).limit(pageOptions.limit).skip(pageOptions.page * pageOptions.limit);

        }
        else {
            return res.status(404).json({error: 'User not found'});
        }
    } catch (e) {
        return next(e);
    }
};

// POST

// Creates new user
const createUser = async ({ body }, res, next) => {
    try {
        body.password = await bcrypt.hash(body.password, 12);
        const user = await User.create({
            username: body.username,
            email: body.email,
            password: body.password,
            comments_id: [],
            forms_id: [],
            group: 'standard'
        });
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

    return res.json({
        user: user.view(),
        token: token
    });
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
            return res.status(202).end;
        }
        return res.status(404).json({error: "User not found"});

    } catch (e) {
        next(e)
    }
};

//FIXME
// Promise rejection probably due to async functions
// Drops all user's comments
const destroyUserComments = (req, res, next) => {
    const id = req.params.id;
    let tokenid = req.user.user_id;

    try {
        // Checking token id
        User.findOne({ user_id: tokenid }).then((usr) => {
            if (usr === null) {
                return res.status(410).json({message: 'Bearer of this token is not registered'});
            }

            // Checking user status (permission ring)
            User.findOne({user_id: id}).then((ussr) => {
                if(ussr === null) {
                    return res.status(410).json({message: 'User of this user_id does not exists'});
                }
               else if(usr.group === 'admin' || usr.user_id === ussr.user_id) {
                    let comments = ussr.comments_id;

                    // Before deletion of a comment its id must also be deleted from comments_id array in both Form and User
                    comments.forEach(id => {
                        // TODO
                    // Form cleanup
                        Comment.findOne({comment_id: id}).then((comm) => {
                            if(comm === null) {
                                console.warn('Comment of id: ' + id + ' is not physically present in database. Try manually cleaning up contents array.');
                            }
                            else {
                                // Cleaning up User comments_id
                                ussr.comments_id = ussr.comments_id.filter(function (value, index, arr) {
                                    return value !== id;
                                });
                                ussr.save();

                                // Cleaning up Form comments_id
                                Form.findOne({form_id: comm.form_id}).then((frm) => {
                                    frm.comments_id = frm.comments_id.filter(function (value, index, arr) {
                                        return value !== id;
                                    });
                                    frm.save();
                                });

                                // Deleting comment
                                comm.remove();
                            }
                        });
                    });
                    return res.status(202).json({message: 'Deleted'});
                }
               else {
                    return res.status(401).json({message: 'Unauthorized'});
                }

            });
        });

    } catch (e) {
        return next(e);
    }
};

module.exports = {
    getUsers,
    getUser,
    getUserComments,
    createUser,
    updateUser,
    destroyUser,
    destroyUserComments,
    loginUser,
    showMe
};