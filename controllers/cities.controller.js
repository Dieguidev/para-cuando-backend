const CitiesServices = require('../services/cities.service');
const { getPagination, getPagingData } = require('../utils/helpers');

const getAllCities = async (req, res, next) => {
  try {

    let query = req.query;
    let { page, size } = query;

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit;
    query.offset = offset;

    let users = await CitiesServices.findAndCountCities(query)
    const results = getPagingData(users, page, limit)
    return res.json({ results: results })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllCities }