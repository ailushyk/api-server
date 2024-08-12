import { Router } from 'express'

import { WalletsController } from '@/plutos/api/wallets-controller'

const router = Router()
const walletsController = new WalletsController()

router.get('/wallets', (req, res) => walletsController.getWallets(req, res))

export default router
