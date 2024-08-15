import express from 'express'

import { authMiddleware } from '@/config/auth-middleware'
import commonRouters from '@/common/api/common-routers'
import healthRouter from '@/common/api/health-router'
import plutosRouter from '@/modules/plutos/api/plutos-router'
import gameRouter from '@/modules/sea-battle/api/game-router'
import { errorHandler } from '@/utils/error-handler'

const app = express()
app.use(express.json())

app.use('/api', authMiddleware.middleware())
app.use('/api/', authMiddleware.protect('user'), commonRouters)
app.use('/api/', authMiddleware.protect('user'), plutosRouter)
// app.use('/api', gameRouter)

app.use(healthRouter)

app.use(errorHandler)

export default app
