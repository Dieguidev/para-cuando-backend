'use strict';
const { Op } = require('sequelize')
const uuid = require('uuid')
const usersServices = require('../../services/users.service')

const usersService = new usersServices()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const adminUser = await usersService.findUserByEmailOr404('diegogaraycullas@gmail.com')
      const adminUser2 = await usersService.findUserByEmailOr404('robert_lca@gmail.com')
      const publicationsSeed = [
        {
          id: uuid.v4(),
          user_id: adminUser.id,
          publication_type_id: 2,
          city_id: 1,
          title: 'Dina Paucar concert',
          description: 'Dina Paucar is great concert in the city of Lima, which all the people of Lima are waiting for.',
          content: 'Dina Paucar la mejor',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          user_id: adminUser2.id,
          publication_type_id: 1,
          city_id: 2,
          title: 'tienda nike en chosica',
          description: 'A nike store in chosica is necessary due to the high demand for products',
          content: 'Urgent a Nike store',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid.v4(),
          user_id: adminUser.id,
          publication_type_id: 3,
          city_id: 8,
          title: 'national chess tournament',
          description: 'We need a chess tournament because of the skill of the players in this city.',
          content: 'national chess tournament',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]
      await queryInterface.bulkInsert('publications', publicationsSeed, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const adminUser = await usersService.findUserByEmailOr404('diegogaraycullas@gmail.com')
    const adminUser2 = await usersService.findUserByEmailOr404('robert_lca@gmail.com')
    const userIds = [
      adminUser.id, adminUser2.id
    ]

    try {
      await queryInterface.bulkDelete(
        'publications',
        {
          user_id: {
            [Op.or]: userIds,
          },
        },
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
};
