const {Form} = require('./model');

//TODO Joi validation

// GET
// Returns all forms currently present in DB
const getForms = async ({ query }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Returns form specified by form_id
const getForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns all comments of form specified by id
const getCommentsFromForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns owner of the form specified by id
const getUserFromForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

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

// Returns array of pages (sets with questions and answers) associated with this form
const getPagesFromForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns page with specified page id
const getPageFromForm = async ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

//POST
// Creates empty form
const addForm = async ({ body }, res, next) => {
    try {
        const form = await Form.create(body);
        return res.status(201).json({
            "form_id": form.form_id,
            "name": form.name,
            "comments_id": form.comments_id,
            "pages": form.pages
        })
    } catch (e) {
        return next(e);
    }
};

// Adds comment to specified form
const addComment = async ({ body }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

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

// Updated page specified by id
const updatePage = async ({ body , params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// DELETE

// Deletes form specified by id
const deleteForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Drops all comments from form
const deleteAllCommentsFromForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Drops pages array from form
const deletePagesFromForm = async ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

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

