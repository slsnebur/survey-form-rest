const { Router } = require('express');
const token = require('../../middlewares/token');
const {
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
} = require('./controller');
const router = Router();

router.get('/', getForms);
router.get('/:id', getForm);
router.get('/:id/comments', getCommentsFromForm);
router.get('/:id/users', getUserFromForm);
router.get('/:id/summary', getSummaryFromForm);
router.get('/:id/qr', getQRForm);
router.get('/:id/pages', getPagesFromForm);
router.get('/:id/pages/:pid', getPageFromForm);

router.post('/', token, addForm);
router.post('/:id/comments', token, addComment);
router.post('/:id/pages', token, addPages);

router.put('/:id', token, updateForm);
router.put('/:id/pages/:pid', token, updatePage);

router.delete('/:id', token, deleteForm);
router.delete('/:id/comments', token, deleteAllCommentsFromForm);
router.delete('/:id/pages', token, deletePagesFromForm);
router.delete('/:id/pages/:pid', token, deletePageFromForm);

module.exports = router;
