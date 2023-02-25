const TagsService = require('../services/tags.service');
const { getPagination, getPagingData } = require('../utils/helpers');

const getAllTags = async (req, res, next) => {
  try {

    let query = req.query;
    let { page, size } = query;

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit;
    query.offset = offset;

    let tags = await TagsService.findAndCountTags(query)
    const results = getPagingData(tags, page, limit)
    return res.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const createTag = async (req, res, next) => {
  try {
    const newTag = req.body;
    console.log(newTag);
    const result = await TagsService.createTag(newTag);
    if (result) {
      res.status(201).json({ message: 'tag created' });
    }
  } catch (error) {
    next(error)
  }
}

const findTagByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await TagsService.findTagByid(id);
    res.json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllTags, createTag, findTagByid }