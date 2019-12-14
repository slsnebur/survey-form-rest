const {Comment} = require('./model');

// GET

// Returns comment by id
const getComment = async ({ query }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};


// PUT

// Updates comment by id
const updateComment = async ({body, params}, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// DELETE

// Deletes comment by id
const deleteComment = async ({params}, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

module.exports = {
    getComment,
    updateComment,
    deleteComment
};