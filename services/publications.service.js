const { Op, where } = require('sequelize');
const { v4: uuid4 } = require('uuid');
const models = require('../database/models')
const { CustomError } = require('../utils/helpers');

class PublicationsService {
  static async findPublicationByTitleOr404(title) {
    if (!title) throw new CustomError('Email not given', 400, 'Bad Request')
    let publication = await models.Publications.findOne({ where: { title } }, { raw: true })
    if (!publication) throw new CustomError('Not found User', 404, 'Not Found')
    return publication
  }

  static async getAllPublications(query) {
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

    const publications = await models.Publications.findAndCountAll(options)
    return publications
  }

  static async createPublication(body) {
    try {
      body.id = uuid4();
      const newPublication = await models.Publications.create(body);

      return newPublication;
    } catch (error) {
      throw new error;
    }
  }

  static async getPublicationsById(id){
    let publication = await models.Publications.findOne({where:{id}}, { raw: true })
    if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')
    return publication
  }
}



module.exports = PublicationsService;