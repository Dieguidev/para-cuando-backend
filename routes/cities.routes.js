const express = require('express');
const { getAllCities } = require('../controllers/cities.controller');
const router = express.Router();
const passport = require('../libs/passport')

router.get('/', passport.authenticate('jwt', { session: false }), getAllCities)

/**
 * @openapi
 * /api/v1/cities:
 *   get:
 *     security:
 *       - bearerAuth: [ ]
 *     summary: Get all Cities
 *     tags:
 *       - City
 *     responses:
 *       200:
 *         description: Get all Cities
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cities'
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

module.exports = router;