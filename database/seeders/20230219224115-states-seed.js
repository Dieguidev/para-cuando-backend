'use strict';
const uuid = require('uuid')
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('states', [
        {
          id: '4',
          name: 'Lima',
          country_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '5',
          name: 'Arequipa',
          country_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: '6',
          name: 'Amazonas',
          country_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
      ], { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, /*Sequelize*/) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('states', {
        name: {
          [Op.or]: ['Lima','Arequipa', 'Amazonas']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
