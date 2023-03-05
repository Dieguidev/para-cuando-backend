const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const options = {
  apis: [
    './routes/auth.routes.js',
    './database/models/users.js',
    './routes/cities.routes.js',
    './database/models/cities.js',
    './routes/countries.router.js',
    './database/models/countries.js',
    './routes/users.routes.js',
    './database/models/users.js',
    './database/models/tags.js',
    './routes/tags.routes.js',
    './routes/roles.routes.js',
    './database/models/roles.js',
    './routes/tags.routes.js',
    './database/models/tags.js'
  ],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'paracuando-api-team-1',
      version: '0.0.9',
      description: 'API para cuando-app',
    },
  },
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('api/v1/docs.json', (req, res) => {
    res.setHeader({ 'Content-Type': 'application/json' })
    res.send(swaggerSpec)
  })
  console.log(
    `la documentacion esta disponible en ${process.env.URL}:${port}/api/v1/docs`
  )
}

module.exports = swaggerDocs
