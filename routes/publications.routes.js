const express = require('express');
const { getAllPublications, createPublication, getPublicationsById, deletePublicationById } = require('../controllers/publications.controller');

const router = express.Router();

router.get('/', getAllPublications)
router.post('/', createPublication)
router.get('/:id', getPublicationsById)
router.delete('/:id',deletePublicationById)

module.exports = router;

/**
 * @openapi
 * /api/v1/publications:
 *   get:
 *     security:
 *       - bearerAuth: [ ]
 *     summary: Get all Countries
 *     tags:
 *       - Country
 *     responses:
 *       200:
 *         description: Get all Cities
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/countries'
 *       400:
 *         description: Validation error
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: validation error
 */