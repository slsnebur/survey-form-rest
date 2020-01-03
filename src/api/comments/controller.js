const {Comment} = require('./model');

// GET

//TODO
// Returns comment by id
const getComment = async ({ query }, res, next) => {
    res.json({message: 'This method has not been implemented'});
};


// PUT

//TODO
// Updates comment by id
const updateComment = async ({body, params}, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

// DELETE

//TODO
// Deletes comment by id
const deleteComment = async ({params}, res, next) => {
    res.json({message: 'This method has not been implemented'});
};

module.exports = {
    getComment,
    updateComment,
    deleteComment
};