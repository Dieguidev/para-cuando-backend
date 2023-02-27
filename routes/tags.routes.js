const express = require('express')
const {
  getAllTags,
  createTag,
  findTagByid,
} = require('../controllers/tags.controller')
const router = express.Router()

/**
 * @openapi
 * /api/v1/tags:
 *  get:
 *    summary: trae todos las etiquetas
 *    tags:
 *      - Tags
 *    responses:
 *      200:
 *        descriptions: todos las etiquetas
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
router.get('/', getAllTags)
router.post('/', createTag)
router.get('/:id', findTagByid)

module.exports = router
