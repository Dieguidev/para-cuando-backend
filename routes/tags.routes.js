const express = require('express');
const passport = require('../libs/passport');
const { isAdmin } = require('../middlewares/autorizations.middlewares');
const { getAllTags, createTag, findTagByid, editingTag, deleteTags } = require('../controllers/tags.controller');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAllTags)
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, createTag)
router.get('/:id', passport.authenticate('jwt', { session: false }), findTagByid)
router.put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, editingTag)
router.delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, deleteTags)

module.exports = router;

/**
 * @openapi
 * /api/v1/roles:
 *   get:
 *     security:
 *       - bearerAuth: [ ]
 *     summary: Get all Tags
 *     tags:
 *       - Tags
 *     responses:
 *       200:
 *         description: Get all Roles
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tags'
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