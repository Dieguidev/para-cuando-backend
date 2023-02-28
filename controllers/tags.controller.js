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

const editingTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await TagsService.findTagByid(id);

    if (tag) {
      const { name, description, image_url } = req.body
      const fieldsModified = { name, description, image_url }
      const result = await TagsService.editingTag(id, fieldsModified)
      res.json({message: 'Succes Update'})
    }
  } catch (error) {
    next(error)
  }
}

const deleteTags = async (req,res,next)=>{
  try {
    const { id } = req.params;
    const tag = await TagsService.findTagByid(id);
    if (tag) {
      const result = await TagsService.deleteTag(id)
      res.json({message: 'Tag Removed'})
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllTags, createTag, findTagByid, editingTag, deleteTags }