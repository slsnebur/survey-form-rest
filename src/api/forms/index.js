const { Router } = require('express');
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
    deletePagesFromForm
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

router.post('/', addForm);
router.post('/:id/comments', addComment);
router.post('/:id/pages', addPages);

router.put('/', updateForm);
router.put('/', updatePage);

router.delete('/', deleteForm);
router.delete('/', deleteAllCommentsFromForm);
router.delete('/', deletePagesFromForm);

module.exports = router;
