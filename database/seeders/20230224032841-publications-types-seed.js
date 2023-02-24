'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {

      const publications_types = [
        {
          id: 1,
          name: 'brands and stores',
          description: 'choose the best brands and stores',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'artists and concerts',
          description: 'choose the best artists and concerts',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'tournaments',
          description: 'choose the best tournaments',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]

      await queryInterface.bulkInsert('publications_types', publications_types, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('publications_types', {
        id: [1, 2, 3],
        name: ['Question Publication', 'Answer Publication', 'Comment'],
        description: [
          'choose the best brands and stores',
          'choose the best artists and concerts',
          'choose the best tournaments'
        ]

      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
