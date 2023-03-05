const { Router } = require('express');
const { getAllPublicationsTypes, getPublicationsTypes, updatePublicationsTypes } = require('../controllers/puiblicationsTypes.controller');
const passport = require('../libs/passport');
const { isAdmin } = require('../middlewares/autorizations.middlewares');

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAllPublicationsTypes);
router.get('/:id', passport.authenticate('jwt', { session: false }), getPublicationsTypes);
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, updatePublicationsTypes)

module.exports = router;