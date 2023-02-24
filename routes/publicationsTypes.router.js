const { Router } = require('express');
const { getAllPublicationsTypes, getPublicationsTypes, updatePublicationsTypes } = require('../controllers/puiblicationsTypes.controller');

const router = Router();

router.get('/', getAllPublicationsTypes);
router.get('/:id', getPublicationsTypes);
router.put('/:id',updatePublicationsTypes)

module.exports = router;