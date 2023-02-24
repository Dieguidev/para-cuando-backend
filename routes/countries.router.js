const { Router } = require('express');
const { getAllCountries } = require('../controllers/countries.controller');

const router = Router();

router.get('/', getAllCountries);

module.exports = router;