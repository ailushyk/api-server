import { Router } from 'express'

import { GameController } from '@/modules/sea-battle/api/game-controller'
import { ShipsController } from '@/modules/sea-battle/api/ships-controller'
import { GameService } from '@/modules/sea-battle/application/game-service'
import { ShipService } from '@/modules/sea-battle/application/ship-service'
import { GameRepositorySQLite } from '@/modules/sea-battle/infrastructure/game-repository-sqlite'
import { ShipRepositorySqlite } from '@/modules/sea-battle/infrastructure/ship-repository-sqlite'

const gameService = new GameService({ repository: new GameRepositorySQLite() })
const gameController = new GameController({ gameService })
const shipService = new ShipService({
  shipRepository: new ShipRepositorySqlite(),
  gameService,
})
const shipsController = new ShipsController({ shipService })

const router = Router()

router.get('/games', (req, res) => gameController.allByUser(req, res))
router.get('/games/:id', (req, res) => gameController.getById(req, res))
router.post('/games', (req, res) => gameController.create(req, res))
router.post('/games/:gameId/start', (req, res) =>
  gameController.start(req, res),
)
router.post('/games/:gameId/move', (req, res) => gameController.move(req, res))
router.get('/games/:gameId/ships', (req, res) =>
  shipsController.getShipsByUser(req, res),
)
router.get('/ships/available', (req, res) =>
  shipsController.getAvailableShips(req, res),
)
router.post('/ships', (req, res) => shipsController.addShip(req, res))
router.delete('/ships/:shipId', (req, res) =>
  shipsController.removeShip(req, res),
)

export default router
