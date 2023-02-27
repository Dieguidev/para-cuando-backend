const express = require('express');
const { getAllPublications, createPublication, getPublicationsById } = require('../controllers/publications.controller');


const router = express.Router();

router.get('/', getAllPublications)
router.post('/', createPublication)
router.get('/:id', getPublicationsById)


module.exports = router;