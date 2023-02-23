'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersTags extends Model {
    static associate(models) {
      UsersTags.belongsTo(models.Users,{as:'user', foreignKey:'user_id'})
      UsersTags.belongsTo(models.Tags,{as:'tag', foreignKey:'tag_id'})
    }
  }
  UsersTags.init({
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'UsersTags',
    tableName: 'users_tags',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {
        attributes: ['tag_id', 'user_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    }
  });
  return UsersTags;
};