const UsersService = require('../services/users.service');
const { getPagination, getPagingData } = require('../utils/helpers');

const usersService = new UsersService();

const getAllUsers = async (req, res, next) => {
  try {
    // const result = await usersService.findAndCount();
    // res.json(result)
    let query = req.query;
    let { page, size } = query;

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit;
    query.offset = offset;

    let users = await usersService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return res.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {

    let iduser = req.user.id
    console.log(iduser);
    let { id } = req.params
    if (iduser === id) {
      let users = await usersService.getAuthUserOr404(id)
      return res.json({ results: users })
    } else {
      let users = await usersService.getAuthUserOr404diferentUser(id)
      return res.json({ results: users })
    }

  } catch (error) {
    next(error)
  }
}

const getUserVotes = async (req, res, next) => {
  try {
    const { id } = req.params
    let query = req.query;
    let { page, size } = query;

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit;
    query.offset = offset;

    let users = await usersService.getUserVotes(query, id)
    const results = getPagingData(users, page, limit)
    return res.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const getUserPublications = async (req, res, next) => {
  try {
    const { id } = req.params
    let query = req.query;
    let { page, size } = query;

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit;
    query.offset = offset;

    let users = await usersService.getUserPublications(query, id)
    const results = getPagingData(users, page, limit)
    return res.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    let { id } = req.params
    let { body } = req
    let user = await usersService.updateUser(id, body)
    return res.json({ message: 'Succes Update' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllUsers, getUser, updateUser, getUserVotes, getUserPublications }