const express = require('express');
const { getAllPublications, createPublication, getPublicationsById, deletePublicationById } = require('../controllers/publications.controller');

const router = express.Router();

router.get('/', getAllPublications)
router.post('/', createPublication)
router.get('/:id', getPublicationsById)
router.delete('/:id',deletePublicationById)


module.exports = router;
