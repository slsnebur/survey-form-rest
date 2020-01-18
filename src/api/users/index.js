const { Router } = require('express');
const password = require('../../middlewares/password');
const token = require('../../middlewares/token');
const groupAuthorize = require('../../middlewares/groupAuthorize');

const {
    getUsers,
    getUser,
    getUserComments,
    createUser,
    updateUser,
    destroyUser,
    destroyUserComments,
    loginUser,
    showMe
} = require('./controller');
const router = Router();

router.get('/', getUsers);
router.get('/me', token, showMe);
router.get('/:id', getUser);
router.get('/:id/comments', getUserComments);


router.post('/', createUser);
router.post('/login', password, loginUser);

router.put('/:id', token, groupAuthorize, updateUser);

router.delete('/:id', token, groupAuthorize, destroyUser);
router.delete('/:id/comments', token, groupAuthorize, destroyUserComments);


module.exports = router;
