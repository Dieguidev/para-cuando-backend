const models = require('../database/models');
const { Op } = require('sequelize');
const { CustomError } = require('../utils/helpers');

class TagsService {
  static async findAndCountTags(query) {
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

    const tags = await models.Tags.findAndCountAll(options)
    return tags
  }

  static async createTag(newTag) {
    try {
      let result = await models.Tags.create(newTag);
      return result
    } catch (error) {
      throw new error
    }
  }

  static async findTagByid(id) {
    let tag = await models.Tags.findByPk(id, { raw: true })
    if (!tag) throw new CustomError('Not found tag', 404, 'Not Found')
    return tag
  }

  static async editingTag(id, fieldsModified) {
    let tag = await models.Tags.update(fieldsModified, { where: { id } })
    return tag
  }

  static async deleteTag(id){
    try {
      const result = await models.Tags.destroy({where:{id}})
      return result
    } catch (error) {
      throw new error;
    }
  }
}

module.exports = TagsService;