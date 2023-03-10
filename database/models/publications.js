'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    static associate(models) {
      Publications.belongsTo(models.Users, { as: 'user', foreignKey: 'user_id' })
      Publications.belongsTo(models.Cities, { as: 'city', foreignKey: 'city_id' })
      Publications.hasMany(models.PublicationsTags, { as: 'publications_tags', foreignKey: 'publication_id' })
      Publications.belongsTo(models.PublicationsTypes, { as: 'publication_type', foreignKey: 'publication_type_id' })
      Publications.hasMany(models.PublicationsImages, { as: 'publications_images', foreignKey: 'publication_id' })
      Publications.hasMany(models.Votes, { as: 'votes', foreignKey: 'publication_id' })
      Publications.belongsToMany(models.Tags, { as: 'tags', through: models.PublicationsTags, foreignKey:'publication_id' })
      //Publications.belongsToMany(models.Votes, { as: 'votes', through: models.PublicationsVotes, foreignKey:'publication_id' })
    }
  }
  Publications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    user_id: DataTypes.UUID,
    publication_type_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'publications',
    underscored: true,
    timestamps: true,
    scopes: {
      view_public: {
        attributes: ['id', 'user_id', 'publication_type_id', 'city_id', 'title', 'description', 'content']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Publications;
};