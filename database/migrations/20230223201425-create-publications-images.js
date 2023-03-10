'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('publications_images', {
        publication_id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          foreignKey: true,
          references: {
            model: 'publications',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        image_url: {
          allowNull: false,
          type: Sequelize.STRING
        },
        order: {
          allowNull: false,
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction });
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('publications_images');
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};