const { Op, where, cast, literal } = require('sequelize');
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
      attributes: {
        include: [
          [cast(literal('(SELECT COUNT(*) FROM "votes" WHERE "votes"."publication_id" = "Publications"."id")'), 'integer'), 'votes_count']
        ]
      }
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { title } = query
    if (title) {
      options.where.title = { [Op.iLike]: `%${title}%` }
    }

    const { description } = query
    if (description) {
      options.where.description = { [Op.iLike]: `%${description}%` }
    }

    options.distinct = true

    const publications = await models.Publications.findAndCountAll(options)
    return publications
  }

  static async createPublication(body) {

    body.id = uuid4();
    // body.city_id = 'DEFAULT_CITY';

    const newPublication = await models.Publications.create(body);

    if (body.tags) {
      let arrayTags = body.tags.split(',')
      let findedTags = await models.Tags.findAll({
        where: { id: arrayTags },
        attributes: ['id'],
        raw: true,
      })

      if (findedTags.length > 0) {
        let tags_ids = findedTags.map(tag => tag['id'])
        await newPublication.setTags(tags_ids)
      }
    }

    return newPublication;

  }

  static async getPublicationsById(id) {
    let publication = await models.Publications.findOne({
      where: { id },
      attributes: {
        include: [
          [cast(literal('(SELECT COUNT(*) FROM "votes" WHERE "votes"."publication_id" = "Publications"."id")'), 'integer'), 'votes_count']
        ]
      },
      include: [{
        model: models.Users,
        as: 'user',
        attributes: ['first_name','last_name','image_url']
      },
      {
        model: models.Cities,
        as: 'city'
      },
      {
        model: models.PublicationsTypes,
        as: 'publication_type'
      },
      {
        model: models.Tags,
        as: 'tags'
      },
      {
        model: models.Votes,
        as: 'votes'
      },
      ]
    }, { raw: true },

    )
    if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')
    return publication
  }

  static async deletePublicationById(id) {
    const result = await models.Publications.destroy({ where: { id } })
    return result
  }
}



module.exports = PublicationsService;