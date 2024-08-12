import express from 'express'
import createError from 'http-errors'

import authRouter from '@/auth/api/auth-router'
import commonRouters from '@/common/api/common-routers'
import healthRouter from '@/common/api/health-router'
import plutosRouter from '@/plutos/api/plutos-router'
import gameRouter from '@/sea-battle/api/game-router'
import { errorHandler } from '@/utils/error-handler'

const app = express()
app.use(express.json())

app.use('/auth', authRouter)
app.use('/api/', commonRouters)
app.use('/api/', plutosRouter)
// app.use('/api', authenticateTokenMiddleware, gameRouter)
app.use('/api', gameRouter)

app.use(healthRouter)
// app.use(function (req, res, next) {
//   next(createError(404))
// })

app.use(errorHandler)

export default app
