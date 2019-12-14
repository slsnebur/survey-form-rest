const { Router } = require('express');
const {
    getUsers,
    getUser,
    getUserComments,
    createUser,
    updateUser,
    destroyUser,
    destroyUserComments
} = require('./controller');
const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/:id/comments', getUserComments);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', destroyUser);
router.delete('/:id/comments', destroyUserComments);


module.exports = router;
