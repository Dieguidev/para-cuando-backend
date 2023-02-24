'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('publications_images', {
        publication_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
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