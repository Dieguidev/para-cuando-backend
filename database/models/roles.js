'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.Profiles, { as: 'profiles', foreignKey:'role_id' })
    }
  }
  Roles.init({
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
    underscored: true,
    timestamps: true,
    scopes: {
      no_timestamps: { attributes: { exclude: ['created_at', 'updated_at'] } }
    }
  });
  return Roles;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     roles:
 *       type: object
 *       properties:
 *         results:
 *           type: object
 *           example:
 *             "count": 8
 *             "totalPages": 1
 *             "currentPage": 1
 *             "results":
 *               "name": Admin
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */