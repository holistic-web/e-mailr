// import libraries
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import routes from './routes'

// initialize express server
const app = express()
const main = express()

// add the path to receive request and set json as bodyParser to process the body

main.use(cors({ origin: true }))
main.use('/api/v1', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false }))

// configure api route controllers
main.use('/pay', routes.CheckoutController)

export default main
