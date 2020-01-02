const { Router } = require('express');
const password = require('../../middlewares/password');

const {
    getUsers,
    getUser,
    getUserComments,
    createUser,
    updateUser,
    destroyUser,
    destroyUserComments,
    loginUser
} = require('./controller');
const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/:id/comments', getUserComments);

router.post('/', createUser);
router.post('/login', password, loginUser);

router.put('/:id', updateUser);

router.delete('/:id', destroyUser);
router.delete('/:id/comments', destroyUserComments);


module.exports = router;
