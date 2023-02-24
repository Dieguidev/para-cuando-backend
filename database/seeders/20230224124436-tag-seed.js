'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {

      const tag = [
        {
          id: 1,
          name: 'Concerts',
          description: 'Concert Tag',
          image_url: 'https://aaaaa.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Tournament',
          description: 'Tournament Tag',
          image_url: 'https://bbbbb.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]

      await queryInterface.bulkInsert('tag', tag, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkDelete('tag', {
        id: [1,2],
        name: ['Concerts','Concert Tag'],
        description: ['Concert Tag','Tournament Tag'],
        image_url: ['https://aaaaa.com','https://bbbbb.com']
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
