
const PublicationsService = require('../services/publications.service');
const { getPagination, getPagingData } = require('../utils/helpers');

const getAllPublications = async (req, res, next) => {
  try {

    let query = req.query;
    let { page, size } = query;

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit;
    query.offset = offset;

    let publications = await PublicationsService.getAllPublications(query)
    const results = getPagingData(publications, page, limit)
    return res.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const createPublication = async (req, res, next) => {
  try {
    let { body } = req;
    let errors = [];
    let newPublication = await PublicationsService.createPublication(body);
    return res
      .status(201)
      .json({
        results: 'Success Publication Created',
        errors
      });
  } catch (error) {
    next(error);
  }
}

const getPublicationsById = async (req, res, next) => {
  try {
    let { id } = req.params
    let publications = await PublicationsService.getPublicationsById(id)
    return res.json({ results: publications })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllPublications, createPublication, getPublicationsById };