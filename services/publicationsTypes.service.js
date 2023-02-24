const models = require('../database/models');
const { CustomError } = require('../utils/helpers');

class PublicationsTypesServices {
  static async getAllPublicationsTypes() {
    const result = await models.PublicationsTypes.findAll()
    return result
  }

  static async getPublicationsTypesOr404(id) {
    let result = await models.PublicationsTypes.findByPk(id, { raw: true });
    if (!result) throw new CustomError('Not found Publication type', 404, 'Not Found');
    return result
  }

  static async updatePublicationsTypes(field, id) {
    try {
      // const publicationsTypes = await models.PublicationsTypes.findByPk(id)
      const result = await models.PublicationsTypes.update(field, {
        where: { id }
      });
      if (!result) throw new CustomError('Not found Publication type', 404, 'Not Found');
      return result
    } catch (error) {
      throw new error
    }
  }
}
module.exports = PublicationsTypesServices