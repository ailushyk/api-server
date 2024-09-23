import { sprintpointAuth } from '#apps/sprintpoint/routes/sprintpoint-auth.ts'
import { setupSprintpointRouter } from '#apps/sprintpoint/routes/sprintpoint-router.ts'
import commonRouters from '#common/api/common-routers.ts'
import healthRouter from '#common/api/health-router.ts'
import { errorHandler } from '#lib/error-handler.ts'
import plutosRouter from '#modules/plutos/api/plutos-router.ts'
import express, { type Express } from 'express'

export function setupApp() {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  app.use(errorHandler)
  return app
}

function setupMiddlewares(app: Express) {
  app.use(express.json())
}

function setupRoutes(app: Express) {
  app.use('/api/plutos', plutosRouter)
  app.use('/api/sprintpoint', sprintpointAuth.middleware())
  app.use(
    '/api/sprintpoint',
    [
      //
      sprintpointAuth.protect(),
    ],
    setupSprintpointRouter(),
  )
  app.use('/api/', commonRouters)
  app.use(healthRouter)
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' })
  })
}
