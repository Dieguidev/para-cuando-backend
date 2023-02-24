'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {

      const tags = [
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
          name: 'sports',
          description: 'sports Tag',
          image_url: 'https://bbbbb.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Clothes and accessories',
          description: 'Clothes and accessories Tag',
          image_url: 'https://cccccc.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'Meet & Greet',
          description: 'Meet & Greet Tag',
          image_url: 'https://dddddd.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          name: 'E-sport',
          description: 'E-sport Tag',
          image_url: 'https://eeeeeee.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          name: 'Pop / Rock',
          description: 'Pop / Rock Tag',
          image_url: 'https://fffffff.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 7,
          name: 'technology',
          description: 'technology Tag',
          image_url: 'https://gggggggggg.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 8,
          name: 'home and decoration',
          description: 'home and decoration Tag',
          image_url: 'https://hhhhhhhhh.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 9,
          name: 'catering',
          description: 'catering Tag',
          image_url: 'https://iiiiiiii.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]

      await queryInterface.bulkInsert('tags', tags, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.bulkDelete('tags', {
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
