const {Form} = require('./model');
const {User} = require('../users/model');
const {Comment} = require('../comments/model');

//TODO Joi validation

// GET
// Returns all forms currently present in DB
const getForms = async ({ query }, res, next) => {
    try {
        // Pagination options
        let pageOptions = {
            page: query.page || 0,
            limit: 5
        };
        await Form.find({}, function(err, forms) {
            let formMap = {};

            forms.forEach(function(form) {
                formMap[form.form_id] = {
                    form_id: form.form_id,
                    name: form.name,
                    user_id: form.user_id,
                    comments_id: form.comments_id,
                    pages: form.pages
                };
            });
            res.status(200).json(formMap);
        }).limit(pageOptions.limit).skip(pageOptions.page * pageOptions.limit);
    } catch (e) {
        return next(e);
    }
};

// Returns form specified by form_id
const getForm = async ({ params }, res, next) => {
    const id = {form_id: params.id};
    try {
        const form = await Form.findOne(id);
        if(form) {
            formLocal = form.view();
            return res.status(200).json(formLocal);
        }
        return res.status(404).json({error: 'Form not found'});
    } catch (e) {
        return next(e);
    }
};

//TODO
// Returns all comments of form specified by id
const getCommentsFromForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns owner of the form specified by id
const getUserFromForm = async ({params}, res, next) => {
    const id = parseInt(params.id);
    try {
        Form.findOne({ form_id: id }).then((frm) => {
            if (frm === null) {
                return res.status(410).json({message: 'Form of such form_id does not exist'});
            }

            User.findOne({user_id: frm.user_id}).then((usr) => {
               if(usr === null) {
                   return res.status(410).json({message: 'Owner of this form does no longer exists'});
               }
               return res.status(200).json({user: usr.view()});
            });
        });
    } catch (e) {
        return next(e);
    }
};

//TODO
// Returns survey results as json
const getSummaryFromForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};


// Returns QR code which contains link to this form
const getQRForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

//TODO
// Returns array of pages (sets with questions and answers) associated with this form
const getPagesFromForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

//TODO
// Returns page with specified page id
const getPageFromForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

//POST
// Creates empty form
const addForm = async (req, res, next) => {
    try {
        const form = await Form.create({
            name: req.body.name,
            user_id: req.user.user_id,
            comments_id: [],
            pages: []
        });
        return res.status(201).json({
            form: form.view()
        })
    } catch (e) {
        return next(e);
    }
};

// Adds comment to specified form
const addComment = async (req, res, next) => {
    let {user} = req;
    let id = req.params.id

    try {
        User.findOne({ user_id: user.user_id }).then((usr) => {
            if (usr === null) {
                return res.status(410).json({message: 'User of this user_id is not currently registered'});
            }
            Form.findOne({form_id: id}).then(async (frm) => {
                if(frm === null) {
                    return res.status(410).json({message: 'Form of such form_id does not exists'});
                }

                // Creating comment and pushing it to DB
                try {
                    const comment = await Comment.create({
                        user_id: usr.user_id,
                        form_id: frm.form_id,
                        username: usr.username,
                        text: req.body.text,
                        timestamp: new Date()
                    });

                    // Updating comments_id array in Form to store comment_id
                    frm.comments_id.push(comment.comment_id);
                    frm.save();

                    return res.status(201).json({comment: comment.view()});
                } catch (e) {
                    console.error(e);
                    return res.status(503).json({message: 'SERVICE UNAVAILABLE'});
                }
            });
        });

    } catch (e) {
        return next(e);
    }
};

//TODO
// Appends to Pages array
const addPages = async ({ body, params }, res, next) => {
    const id = {form_id: params.id};
    const { pages } = body;
    try {
        const form = await Form.findOne(id);
        if(form) {
            //TODO pid indexing and other stuff
            return res.status(200).json({"message": "Successfully added form pages list/array"});
        }
        return res.status(404).json({"error": "Form not found"});
    } catch (e) {
        return next(e);
    }


/*
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

 */
};

// PUT

// Updates form specified by id
const updateForm = async ({ body , params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

//TODO
// Updated page specified by id
const updatePage = async ({ body , params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// DELETE

// Deletes form specified by id
const deleteForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

//TODO
// Drops all comments from form
const deleteAllCommentsFromForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

//TODO
// Drops pages array from form
const deletePagesFromForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

//TODO
// Drops specified page from form
const deletePageFromForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};


module.exports = {
    getForms,
    getForm,
    getCommentsFromForm,
    getUserFromForm,
    getSummaryFromForm,
    getQRForm,
    getPagesFromForm,
    getPageFromForm,
    addForm,
    addComment,
    addPages,
    updateForm,
    updatePage,
    deleteForm,
    deleteAllCommentsFromForm,
    deletePagesFromForm,
    deletePageFromForm
};

