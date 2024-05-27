import express from 'express'
import createError from 'http-errors'

import gameRouter from '@/sea-battle/api/game-router'
import { errorHandler } from '@/utils/error-handler'

const app = express()

app.use(express.json())
app.use('/api', gameRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(errorHandler)

export default app
