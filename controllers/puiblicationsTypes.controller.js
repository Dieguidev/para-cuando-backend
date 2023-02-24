const PublicationsTypesServices = require('../services/publicationsTypes.service');


const getAllPublicationsTypes = async (req, res, next) => {
  try {
    const result = await PublicationsTypesServices.getAllPublicationsTypes();
    return res.json({ resutls: result });
  } catch (error) {
    next(error);
  }
}

const getPublicationsTypes = async (req, res, next) => {
  try {
    const { id } = req.params;
    let result = await PublicationsTypesServices.getPublicationsTypesOr404(id);
    return res.json({ results: result })
  } catch (error) {
    next(error)
  }
}

const updatePublicationsTypes = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description } = req.body
    const field = { name, description }
    const result = await PublicationsTypesServices.updatePublicationsTypes(field, id);
    res.json( {message: 'Succes Update'})
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllPublicationsTypes, getPublicationsTypes,updatePublicationsTypes };