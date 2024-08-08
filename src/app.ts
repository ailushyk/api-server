import express from 'express'
import createError from 'http-errors'

import authRouter from '@/auth/api/auth-router'
import healthRouter from '@/common/api/health-router'
import gameRouter from '@/sea-battle/api/game-router'
import { errorHandler } from '@/utils/error-handler'

const app = express()
app.use(express.json())

app.use('/auth', authRouter)
// app.use('/api', authenticateTokenMiddleware, gameRouter)
app.use('/api', gameRouter)

app.use(healthRouter)
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(errorHandler)

export default app
