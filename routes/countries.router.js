const express = require('express')
const router = express.Router()
const passport = require('../libs/passport')

const { getAllCountries } = require('../controllers/countries.controller');

router.get('/', passport.authenticate('jwt', { session: false }), getAllCountries);

module.exports = router;

/**
 * @openapi
 * /api/v1/countries:
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