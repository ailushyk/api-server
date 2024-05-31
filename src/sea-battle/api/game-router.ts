import { Router } from 'express'

import { GameController } from '@/sea-battle/api/game-controller'
import { GameService } from '@/sea-battle/application/game-service'
import { GameRepositorySQLite } from '@/sea-battle/infrastructure/game-repository-sqlite'

const repository = new GameRepositorySQLite()
const gameService = new GameService({ repository })
const gameController = new GameController({ gameService })

const router = Router()
router.post('/games', (req, res) => gameController.create(req, res))
router.get('/games', (req, res) => gameController.all(req, res))
router.get('/games/:id', (req, res) => gameController.get(req, res))

export default router
