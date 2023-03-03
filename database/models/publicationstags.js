'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicationsTags extends Model {
    static associate(models) {
      PublicationsTags.belongsTo(models.Tags, { as: 'tag', foreignKey: 'tag_id' })
      PublicationsTags.belongsTo(models.Publications, { as: 'publication', foreignKey: 'publication_id' })
    }
  }
  PublicationsTags.init({
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    publication_id: {
      type: DataTypes.UUIDV4,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'PublicationsTags',
    tableName: 'publications_tags',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {
        attributes: ['tag_id', 'publication_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    }
  });
  return PublicationsTags;
};