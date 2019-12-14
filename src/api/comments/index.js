const { Router } = require('express');
const {
    getComment,
    updateComment,
    deleteComment
} = require('./controller');
const router = Router();

router.get('/:id', getComment);

router.put('/:id', updateComment);

router.delete('/:id', deleteComment);

module.exports = router;
