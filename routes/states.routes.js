const express = require('express');
const { getAllStates } = require('../controllers/states.controller');
const router = express.Router();

router.get('/', getAllStates)

module.exports = router;