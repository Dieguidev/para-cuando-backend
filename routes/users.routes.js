const express = require('express');
const { getAllUsers, getUser, updateUser, getUserVotes, getUserPublications } = require('../controllers/users.controller');
const router = express.Router();
const passport = require('../libs/passport');
const { isAdmin } = require('../middlewares/autorizations.middlewares');

/**
 * @openapi
 * /api/v1/users:
 *  get:
 *    summary: trae todos los usuarios
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        descriptions: todos los usuarios
 * /api/v1/users/:{id}:
 *   get:
 *     summary: trae todos los usuarios
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           minimun: 1
 *         description: cart id
 *     responses:
 *       200:
 *         descriptions: el usuario es
 * /api/v1/users/{id}:
 *   put:
 *     summary: actualiza los usuarios
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimun: 1
 *         description: users id
 *     requestBody:
 *       description: 'requerido del body'
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         descriptions: se actualizo el usuario correctamente
 */

router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, getAllUsers)
router.get('/:id', passport.authenticate('jwt', { session: false }), getUser)
router.get('/:id/votes', passport.authenticate('jwt', { session: false }), getUserVotes)
router.get('/:id/publications', passport.authenticate('jwt', { session: false }), getUserPublications)
router.put('/:id', updateUser)


module.exports = router;
