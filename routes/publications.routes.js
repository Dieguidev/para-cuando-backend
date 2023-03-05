const express = require('express');
const { getAllPublications, createPublication, getPublicationsById, deletePublicationById } = require('../controllers/publications.controller');
const passport = require('../libs/passport');
const { isAdmin } = require('../middlewares/autorizations.middlewares');

const router = express.Router();

router.get('/', getAllPublications)
router.post('/', passport.authenticate('jwt', { session: false }), createPublication)
router.get('/:id', getPublicationsById)
router.delete('/:id', passport.authenticate('jwt', { session: false }),isAdmin, deletePublicationById)


module.exports = router;
