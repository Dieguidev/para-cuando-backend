'use strict';

const PublicationsService = require('../../services/publications.service');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const publicationId = await PublicationsService.getPublicationsOr404('Dina Paucar concert')
      const publicationId2 = await PublicationsService.getPublicationsOr404('national chess tournament')
      const publications_tags = [
        {
          tag_id: 1,
          publication_id: publicationId.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          tag_id: 2,
          publication_id: publicationId2.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]

      await queryInterface.bulkInsert('publications_tags', publications_tags, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const publicationId = await PublicationsService.getPublicationsOr404('Dina Paucar concert')
      const publicationId2 = await PublicationsService.getPublicationsOr404('national chess tournament')

      await queryInterface.bulkDelete('publications_tags', {
        tag_id: [1, 2],
        publication_id: [publicationId.id, publicationId2.id],

      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
