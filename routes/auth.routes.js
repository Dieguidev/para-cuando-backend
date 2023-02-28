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
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Sign-up User
 *     tags: [Auth]
 *     requestBody:
 *       description: Required fields to logged user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/sign-up'
 *     responses:
 *       201:
 *         description: Sing-up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success Sign Up
 *       401:
 *         description: not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: validation error
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
 *       200:
 *         description: LogIn user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/loginResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not found User
 * /api/v1/auth/me:
 *   get:
 *     security:
 *       - bearerAuth: [ ]
 *     summary: My info
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: My info
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results: 
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: 5d4af23b-97d2-489e
 *                   first_name:
 *                     type: string
 *                     example: Diego
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
 * /api/v1/auth/forget-password:
 *   post:
 *     summary: My info
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Required fields to new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/forgetPassword'
 *     responses:
 *       200:
 *         description: My info
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results: 
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: 5d4af23b-97d2-489e
 *                   first_name:
 *                     type: string
 *                     example: Diego
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
 * /api/v1/auth/change-password/{token}:
 *   post:
 *     summary: My info
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           minimun: 1
 *         description: token
 *     requestBody:
 *       description: Required fields to new password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/changePassword'
 *     responses:
 *       200:
 *         description: My info
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results: 
 *                   first_name:
 *                     type: string
 *                     example: Diego
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

router.post('/login', logIn)

router.post('/sign-up', verifySchema(signupSchema, 'body'), signUp)

router.get('/me', passport.authenticate('jwt', { session: false }), userToken)

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
