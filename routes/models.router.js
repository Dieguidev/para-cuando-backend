const express = require('express');
const routesUsers = require('./users.routes');
const routesPublicationsTypes = require('./publicationsTypes.router');
const routesCountries = require('./countries.router');
const routesStates = require('./states.routes');
const routesCities = require('./cities.routes');
const routerRoles = require('./roles.routes');
const routerTags = require('./tags.routes');
const routesPublications = require ('./publications.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesAuth = require('./auth.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use('/users', routesUsers)
  router.use('/publications-types', routesPublicationsTypes)
  router.use('/countries', routesCountries)
  router.use('/states', routesStates)
  router.use('/cities',routesCities)
  router.use('/roles', routerRoles)
  router.use('/tags', routerTags)
  router.use('/publications', routesPublications)
}
module.exports = routerModels;
