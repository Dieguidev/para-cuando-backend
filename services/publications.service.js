const models = require('../database/models')
const { CustomError } = require('../utils/helpers');

class PublicationsService {
  static async getPublicationsOr404(id) {
    let publication = await models.Users.scope('auth_flow').findByPk(id, { raw: true });
    if (!publication) throw new CustomError('Not found User', 404, 'Not Found');
    return publication;
  }
}

module.exports = PublicationsService;