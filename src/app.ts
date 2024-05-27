import express from 'express'

import gameRouter from '@/sea-battle/api/game-router'
import userRoutes from '@/user/api/user-router'
import { errorHandler } from '@/utils/error-handler'

const app = express()

app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', gameRouter)
app.use(errorHandler)

export default app
