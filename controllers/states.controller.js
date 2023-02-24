const StatesService = require('../services/states.service');
const { getPagination, getPagingData } = require('../utils/helpers');

const getAllStates = async (req, res, next) => {
  try {

    let query = req.query;
    let { page, size } = query;

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit;
    query.offset = offset;

    let users = await StatesService.findAndCountStates(query)
    const results = getPagingData(users, page, limit)
    return res.json({ results: results })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllStates }