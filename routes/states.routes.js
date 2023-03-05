const express = require('express');
const { getAllStates } = require('../controllers/states.controller');
const router = express.Router();
const passport = require('../libs/passport');

router.get('/', passport.authenticate('jwt', { session: false }), getAllStates)

module.exports = router;

