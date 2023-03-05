'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      Tags.hasMany(models.UsersTags,{as:'users_tags',foreignKey:'tag_id'})
      Tags.hasMany(models.PublicationsTags,{as:'publications_tags',foreignKey:'tag_id'})
    }
  }
  Tags.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
  }, {
    sequelize,
    modelName: 'Tags',
    tableName: 'tags',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {
        attributes: ['id', 'name', 'description','image_url']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    }
  });
  return Tags;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     tags:
 *       type: object
 *       properties:
 *         results:
 *           type: object
 *           example:
 *             "count": 8
 *             "totalPages": 1
 *             "currentPage": 1
 *             "results":
 *               "name": Lima
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */