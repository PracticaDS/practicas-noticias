import express from 'express'
import bodyParser from 'body-parser'

// Express configuration
const app = express()
app.use(bodyParser.json())

import routes from './routes/routes.js'

//Static resources
app.use(express.static(__dirname + "/../../dist/frontend"))
//Backend API
app.use(routes)

export default app
