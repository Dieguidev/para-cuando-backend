'use strict';
const usersServices = require('../../services/users.service')
const PublicationsService = require('../../services/publications.service');

const usersService = new usersServices()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const publicationId = await PublicationsService.findPublicationByTitleOr404('Dina Paucar concert')
      const publicationId2 = await PublicationsService.findPublicationByTitleOr404('national chess tournament')
      const adminUser = await usersService.findUserByEmailOr404('diegogaraycullas@gmail.com')
      const adminUser2 = await usersService.findUserByEmailOr404('robert_lca@gmail.com')
      const votes = [
        {
          publication_id: publicationId.id,
          user_id: adminUser.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          publication_id: publicationId2.id,
          user_id: adminUser2.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]

      await queryInterface.bulkInsert('votes', votes, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const adminUser = await usersService.findUserByEmailOr404('diegogaraycullas@gmail.com')
      const adminUser2 = await usersService.findUserByEmailOr404('robert_lca@gmail.com')
      const publicationId = await PublicationsService.findPublicationByTitleOr404('Dina Paucar concert')
      const publicationId2 = await PublicationsService.findPublicationByTitleOr404('national chess tournament')

      await queryInterface.bulkDelete('votes', {
        publication_id:[publicationId.id,publicationId2.id],
        user_id: [adminUser.id, adminUser2.id],
        

      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
