'use strict';
const usersServices = require('../../services/users.service')

const usersService = new usersServices()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const adminUser = await usersService.findUserByEmailOr404('diegogaraycullas@gmail.com')
      const adminUser2 = await usersService.findUserByEmailOr404('robert_lca@gmail.com')
      const users_tags = [
        {
          tag_id: 1,
          user_id: adminUser.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_id: 2,
          user_id: adminUser2.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]

      await queryInterface.bulkInsert('users_tags', users_tags, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const adminUser = await usersService.findUserByEmailOr404('diegogaraycullas@gmail.com')
      const adminUser2 = await usersService.findUserByEmailOr404('robert_lca@gmail.com')
      await queryInterface.bulkDelete('users_tags', {
        user_id: [adminUser.id, adminUser2.id],
        tag_id: [1,2]

      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
