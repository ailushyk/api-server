import express, { Express } from 'express'

import { errorHandler } from '@/lib/error-handler'
import { sprintpointAuth } from '@/apps/sprintpoint/routes/sprintpoint-auth'
import { setupSprintpointRouter } from '@/apps/sprintpoint/routes/sprintpoint-router'
import commonRouters from '@/common/api/common-routers'
import healthRouter from '@/common/api/health-router'
import plutosRouter from '@/modules/plutos/api/plutos-router'

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
