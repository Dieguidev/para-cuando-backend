'use strict';
const PublicationsService = require('../../services/publications.service');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const publicationId = await PublicationsService.findPublicationByTitleOr404('Dina Paucar concert')
      const publicationId2 = await PublicationsService.findPublicationByTitleOr404('national chess tournament')
      const publications_images = [
        {
          publication_id: publicationId.id,
          image_url: 'https://aaaaa.com',
          order: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          publication_id: publicationId2.id,
          image_url: 'https://bbbbbb.com',
          order: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]

      await queryInterface.bulkInsert('publications_images', publications_images, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const publicationId = await PublicationsService.findPublicationByTitleOr404('Dina Paucar concert')
      const publicationId2 = await PublicationsService.findPublicationByTitleOr404('national chess tournament')

      await queryInterface.bulkDelete('publications_tags', {
        publication_id: [publicationId.id, publicationId2.id],
        image_url: ['https://aaaaa.com', 'https://bbbbbb.com'],
        order: [1, 2],

      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
