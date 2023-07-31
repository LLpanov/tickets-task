import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { apiRouter } from './router/index.js'
import { AppError } from './utils/index.js'
import { config } from './config/config.js'
import { errorHandler } from './middlewares/index.js'
import { graphqlHTTP } from 'express-graphql'
import { resolvers, ticketSchema } from './graphql/index.js';

const app = express()

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(
  '/graphql',
  graphqlHTTP({
    schema: ticketSchema,
    graphiql: true,
    rootValue: resolvers
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/v1', apiRouter)

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this sever!`, 404))
})

app.use(errorHandler)
export default app
