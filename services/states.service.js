const models = require('../database/models');
const { Op } = require('sequelize');

class StatesService {
  static async findAndCountStates(query) {
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

    const states = await models.States.findAndCountAll(options)
    return states
  }
}

module.exports = StatesService;