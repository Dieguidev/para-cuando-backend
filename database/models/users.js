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
  /**
   * @openapi
   * components:
   *   schemas:
   *     register:
   *       type: object
   *       properties:
   *         username:
   *           type: string
   *           example: luciano
   *         email:
   *           type: string
   *           example: robert_lca91@homail.com
   *         password:
   *           type: string
   *           example: 1234
   *     login:
   *       type: object
   *       properties:
   *         email:
   *           type: string
   *           example: ian.rosas@academlo.com
   *         password:
   *           type: string
   *           example: 1234
   *     loginResponse:
   *       type: object
   *       properties:
   *         username:
   *           type: string,
   *           example: luciano
   *         id:
   *           type: int
   *           example: 2
   *         email:
   *           type: string
   *           example: robert_lca91@hotmail.com
   *         token:
   *           type: string
   *           example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJ0cmF2ZXN0aWRpZWdvIiwibGFzdG5hbWUiOiJsb2NhcGF1bCIsImlkIjozLCJlbWFpbCI6ImRpZWd1aXRvQGdtYWlsLmNvbSIsImlhdCI6MTY3NDg2MjE0OCwiZXhwIjoxNjc0ODYyNzQ4fQ.AMsqYOxB5ExrJSBD-6bob9vj0kLBZD4xZutxTfgC2ZszTCN8v9pc7yC04KytGAyOV9NcDJy2DerZ7CSiMImM5A
   *   securitySchemes:
   *     bearerAuth:
   *       type: http
   *       scheme: bearer
   *       bearerFormat: JWT
   */
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
