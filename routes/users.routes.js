const express = require('express')
const {
  getAllUsers,
  getUser,
  updateUser,
} = require('../controllers/users.controller')
const { isAdmin } = require('../middlewares/autorizations.middlewares')
const router = express.Router()

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

router.get('/', getAllUsers)

router.get('/:id', getUser)

router.put('/:id', updateUser)

module.exports = router
