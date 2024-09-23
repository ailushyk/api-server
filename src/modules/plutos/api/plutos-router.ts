import { WalletsController } from '#modules/plutos/api/wallets-controller.ts'
import { CurrencyService } from '#modules/plutos/application/currency-service.ts'
import { UserWalletService } from '#modules/plutos/application/user-wallet-service.ts'
import { WalletTypeService } from '#modules/plutos/application/wallet-type-service.ts'
import { CurrencyRepositoryPg } from '#modules/plutos/infrastructure/currency-repository-pg.ts'
import { UserWalletsRepositoryPg } from '#modules/plutos/infrastructure/user-wallets-repository-pg.ts'
import { WalletTypeRepositoryPg } from '#modules/plutos/infrastructure/wallet-type-repository-pg.ts'
import { Router } from 'express'

import { CurrencyController } from './currency-controller.ts'
import { WalletTypeController } from './wallet-type-controller.ts'

const router = Router()

const currencyController = new CurrencyController({
  currencyService: new CurrencyService({
    repository: new CurrencyRepositoryPg(),
  }),
})
router.get('/currencies', (req, res) =>
  currencyController.getCurrencies(req, res),
)

const walletTypeController = new WalletTypeController({
  walletTypeService: new WalletTypeService({
    repository: new WalletTypeRepositoryPg(),
  }),
})
router.get('/wallet-types', (req, res) => walletTypeController.all(req, res))

const walletsController = new WalletsController({
  userWalletsService: new UserWalletService({
    repository: new UserWalletsRepositoryPg(),
  }),
})
router.get('/wallets', (req, res) => walletsController.getWallets(req, res))
router.post('/wallets', (req, res) => walletsController.createWallet(req, res))

export default router
