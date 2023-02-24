const models = require('../database/models')
const { CustomError } = require('../utils/helpers');

class PublicationsService {
  static async findPublicationByTitleOr404(title) {
    if (!title) throw new CustomError('Email not given', 400, 'Bad Request')
    let publication = await models.Publications.findOne({ where: { title } }, { raw: true })
    if (!publication) throw new CustomError('Not found User', 404, 'Not Found')
    return publication
  }
}

module.exports = PublicationsService;