import express from 'express'

import userRoutes from './routes/user-routes'
import { errorHandler } from './utils/error-handler'

const app = express()

app.use(express.json())
app.use('/adapters', userRoutes)
app.use(errorHandler)

export { app }
