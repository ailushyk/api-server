import express from 'express'

import { errorHandler } from '../../utils/error-handler'
import userRoutes from './routes/user-routes'

const app = express()

app.use(express.json())
app.use('/api', userRoutes)
app.use(errorHandler)

export default app
