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
//TODO
router.get('/:id/pages/:pid', getPageFromForm);

router.post('/', addForm);
router.post('/:id/comments', addComment);
router.post('/:id/pages', addPages);

//TODO
router.put('/:id', updateForm);
router.put('/:id/pages/:pid', updatePage);

//TODO
router.delete('/:id', deleteForm);
router.delete('/:id/comments', deleteAllCommentsFromForm);
router.delete('/:id/pages', deletePagesFromForm);
router.delete('/:id/pages/:pid', deletePageFromForm);

module.exports = router;
