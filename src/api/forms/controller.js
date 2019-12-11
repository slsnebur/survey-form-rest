const {Form} = require('./model');

//TODO Joi validation

// GET
// Returns all forms currently present in DB
const getForms = ({ query }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Returns form specified by form_id
const getForm = ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns all comments of form specified by id
const getCommentsFromForm = ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns owner of the form specified by id
const getUserFromForm = ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns survey results as json
const getSummaryFromForm = ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns QR code which contains link to this form
const getQRForm = ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns array of pages (sets with questions and answers) associated with this form
const getPagesFromForm = ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

// Returns page with specified page id
const getPageFromForm = ({ params }, res, next) => {
    const id = parseInt(params.id);
    res.json({message: 'This method has not been implemented'});
};

//POST
// Creates empty form
const addForm = ({ body }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Adds comment to specified form
const addComment = ({ body }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Appends to Pages array
const addPages = ({ body }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// PUT

// Updates form specified by id
const updateForm = ({ body , params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Updated page specified by id
const updatePage = ({ body , params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// DELETE

// Deletes form specified by id
const deleteForm = ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Drops all comments from form
const deleteAllCommentsFromForm = ({ params }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// Drops pages array from form
const deletePagesFromForm = ({ params }, res, next) => {
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
    deletePagesFromForm
};

