const express = require('express');
const { getAllRoles } = require('../controllers/roles.controller');

const router = express.Router();

router.get('/', getAllRoles)

module.exports = router;
/**
 * @openapi
 * /api/v1/orders/{id}:
 *   get:
 *     security:
 *       - bearerAuth: [ ]
 *     summary: get products in cart
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimun: 1
 *         description: user id
 *     responses:
 *       200:
 *         description: get products in order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:
 *                     id: 2
 *                     username: Diego
 *                     email: diego@gmail.com
 *                     orders:
 *                       id: 1
 *                       total_price: 4000
 *                       purchase_delivered: false
 *                       product_in_orders:
 *                         id: 1
 *                         quantity: 2
 *                         price: 4000
 *                         purchase_completed: false,
 *                         product:
 *                           id: 1
 *                           name: TV
 *                           price: 2000
 *                           available_qty: 7
 *                           is_available: true
 *                           seller_id: 1
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