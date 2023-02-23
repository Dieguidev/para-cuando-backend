'use strict';
const { Op } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const citiesSeeds = [
      {
        id: 1,
        name: 'Lima',
        state_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Chosica',
        state_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'San Vicente de Cañete',
        state_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'Huacho',
        state_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name: 'Matucana',
        state_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        name: 'Barranca',
        state_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        name: 'Oyón',
        state_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        name: 'Huaral',
        state_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]

    try {
      await queryInterface.bulkInsert('cities', citiesSeeds, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },


  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const userNames = [
      'Lima', 'Chosica', 'San Vicente de Cañete', 'Huacho', 'Matucana', 'Barranca', 'Oyón', 'Huaral'
    ]

    try {
      await queryInterface.bulkDelete(
        'cities',
        {
          username: {
            [Op.or]: userNames,
          },
        },
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
