const express = require('express');
const { getAllRoles } = require('../controllers/roles.controller');

const router = express.Router();

router.get('/', getAllRoles)



module.exports = router;