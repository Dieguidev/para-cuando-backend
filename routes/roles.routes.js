const express = require('express');
const { getAllRoles } = require('../controllers/roles.controller');
const passport = require('../libs/passport');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAllRoles)

module.exports = router;
/**
 * @openapi
 * /api/v1/roles:
 *   get:
 *     security:
 *       - bearerAuth: [ ]
 *     summary: Get all Roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Get all Roles
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/roles'
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