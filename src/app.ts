import express, { Express } from 'express'

import { authSession, sessionMemoryStore } from '@/config/session'
import { errorHandler } from '@/lib/error-handler'
import { setupSprintpointRouter } from '@/apps/sprintpoint/api/sprintpoint-router'
import commonRouters from '@/common/api/common-routers'
import healthRouter from '@/common/api/health-router'
import { authMiddleware } from '@/common/auth-middleware'
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
  app.use(authSession())
  app.use('/api', authMiddleware.middleware())
}

function setupRoutes(app: Express) {
  app.use('/api/', authMiddleware.protect('user'), commonRouters)
  app.use('/api/plutos', authMiddleware.protect('user'), plutosRouter)
  // app.use('/api', gameRouter)
  setupSprintpointRouter(app)
  app.use(healthRouter)
}
