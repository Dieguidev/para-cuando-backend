const express = require('express');
const { getAllCities } = require('../controllers/cities.controller');
const router = express.Router();

router.get('/', getAllCities)

module.exports = router;