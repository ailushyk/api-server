import { Router } from 'express'

import { WalletsController } from '@/modules/plutos/api/wallets-controller'
import { CurrencyService } from '@/modules/plutos/application/currency-service'
import { UserWalletService } from '@/modules/plutos/application/user-wallet-service'
import { WalletTypeService } from '@/modules/plutos/application/wallet-type-service'
import { CurrencyRepositoryPg } from '@/modules/plutos/infrastructure/currency-repository-pg'
import { UserWalletsRepositoryPg } from '@/modules/plutos/infrastructure/user-wallets-repository-pg'
import { WalletTypeRepositoryPg } from '@/modules/plutos/infrastructure/wallet-type-repository-pg'

import { CurrencyController } from './currency-controller'
import { WalletTypeController } from './wallet-type-controller'

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
