'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    static associate(models) {
      Cities.belongsTo(models.States, { as: 'city', foreignKey: 'state_id' })
      Cities.hasMany(models.Publications, { as: 'publications', foreignKey: 'city_id' })
    }
  }
  Cities.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cities',
    tableName: 'cities',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {
        attributes: ['id', 'name', 'state_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Cities;
};