'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Countries, {
        as: 'country',
        foreignKey: 'country_id',
      })
      Users.hasMany(models.Profiles, { as: 'profiles', foreignKey: 'user_id' })
      Users.hasMany(models.Publications, { as: 'publications', foreignKey: 'user_id' })
      Users.hasMany(models.UsersTags, { as: 'users_tags', foreignKey: 'user_id' })
      Users.hasMany(models.Votes, { as: 'votes', foreignKey: 'user_id' })
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      username: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email_verified: {
        type: DataTypes.DATE,
      },
      token: {
        type: DataTypes.TEXT,
      },
      code_phone: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      country_id: DataTypes.INTEGER,
      image_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'users',
      underscored: true,
      timestamps: true,
      scopes: {
        view_public: {
          attributes: [
            'id',
            'first_name',
            'last_name',
            'country_id',
            'image_url',
          ],
        },
        view_same_user: {
          attributes: [
            'id',
            'first_name',
            'last_name',
            'country_id',
            'image_url',
            'email',
            'username',
            'code_phone',
            'phone',
          ],
        },
        auth_flow: {
          attributes: ['id', 'first_name', 'last_name', 'email', 'username'],
        },
        view_me: {
          attributes: [
            'id',
            'first_name',
            'last_name',
            'email',
            'username',
            'image_url',
          ],
        },
      },
      hooks: {
        beforeCreate: (user, options) => {
          if (user.email) {
            let emailLowercase = String(user.email).toLocaleLowerCase()
            user.email = emailLowercase
            user.username = emailLowercase
          }
        },
      },
    }
  )
  return Users
}

/**
 * @openapi
 * components:
 *   schemas:
 *     sign-up:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           example: Diego
 *         last_name:
 *           type: string
 *           example: Garay
 *         email:
 *           type: string
 *           example: diego@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: diegogaray@gmail.com
 *         password:
 *           type: string
 *           example: 1234
 *     loginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Correct Credentials
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     forgetPassword:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: diego@gmail.com
 *     changePassword:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           example: 1234
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */