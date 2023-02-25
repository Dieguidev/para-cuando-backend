const models = require('../database/models');
const { Op } = require('sequelize');

class CitiesServices {
  static async findAndCountCities(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { id } = query
    if (id) {
      options.where.id = id
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }


    options.distinct = true

    const cities = await models.Cities.findAndCountAll(options)
    return cities
  }
}

module.exports = CitiesServices;
