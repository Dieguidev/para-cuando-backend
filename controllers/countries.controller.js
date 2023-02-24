const CountriesService = require('../services/countries.service');
const { getPagination, getPagingData } = require('../utils/helpers');

const getAllCountries = async (req, res, next) => {
  try {
    let query = req.query;
    let { page, size } = query;

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit;
    query.offset = offset;

    let countries = await CountriesService.findAndCount(query)
    const results = getPagingData(countries, page, limit)
    return res.json({ results: results })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllCountries }