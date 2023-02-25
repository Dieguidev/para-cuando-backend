const express = require('express')
const router = express.Router()

const passport = require('../libs/passport')

const verifySchema = require('../schemas/joiSchema.checker')
const {
  signupSchema,
  forgetPasswordSchema,
  restorePasswordSchema,
} = require('../schemas/auth.schemas')

const {
  signUp,
  logIn,
  forgetPassword,
  restorePassword,
  userToken,
} = require('../controllers/auth.controller')

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: login user into application
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Required fields to log in
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user log in
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
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Registered User
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to logged user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sign-up'
 *     responses:
 *       200:
 *         description: Sing-up
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/sign-upResponse'
 *       401:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: unauthorized
 * /api/v1/auth/forget-password:
 *   post:
 *     summary: Registered User
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to logged user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forget-password'
 *     responses:
 *       200:
 *         description: Sing-up
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/forget-passwordResponse'
 *       401:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: unauthorized
 * /api/v1/auth/change-password/:token:
 *   post:
 *     summary: Registered User
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to logged user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/change-password/:token'
 *     responses:
 *       200:
 *         description: change-password/:token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/change-password/:tokenResponse'
 *       401:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: unauthorized
 * /api/v1/auth/me:
 *   get:
 *     summary: me
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to logged user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/me'
 *     responses:
 *       200:
 *         description: change-password/:token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/meResponse'
 *       401:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: unauthorized
 * /api/v1/auth/testing:
 *   get:
 *     summary: me
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to logged user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/testing'
 *     responses:
 *       200:
 *         description: change-password/:token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/testingResponse'
 *       401:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: unauthorized

 */

router.post('/login', logIn)

router.post('/sign-up', verifySchema(signupSchema, 'body'), signUp)

router.post(
  '/forget-password',
  verifySchema(forgetPasswordSchema, 'body'),
  forgetPassword
)

router.post(
  '/change-password/:token',
  verifySchema(restorePasswordSchema, 'body'),
  restorePassword
)

router.get('/me', passport.authenticate('jwt', { session: false }), userToken)

router.get(
  '/testing',
  passport.authenticate('jwt', { session: false }),
  async (request, response, next) => {
    try {
      return response.status(200).json({
        results: {
          user: request.user,
          isAuthenticated: request.isAuthenticated(),
          isUnauthenticated: request.isUnauthenticated(),
          _sessionManager: request._sessionManager,
          authInfo: request.authInfo,
        },
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

module.exports = router
