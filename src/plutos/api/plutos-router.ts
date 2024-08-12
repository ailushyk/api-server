import { Router } from 'express'

import { CurrencyController } from '@/plutos/api/currency-controller'
import { WalletTypeController } from '@/plutos/api/wallet-type-controller'
import { WalletsController } from '@/plutos/api/wallets-controller'
import { CurrencyService } from '@/plutos/application/currency-service'
import { UserWalletService } from '@/plutos/application/user-wallet-service'
import { WalletTypeService } from '@/plutos/application/wallet-type-service'
import { CurrencyRepositoryPg } from '@/plutos/infrastructure/currency-repository-pg'
import { UserWalletsRepositoryPg } from '@/plutos/infrastructure/user-wallets-repository-pg'
import { WalletTypeRepositoryPg } from '@/plutos/infrastructure/wallet-type-repository-pg'

const router = Router()

const walletsController = new WalletsController({
  userWalletsService: new UserWalletService({
    repository: new UserWalletsRepositoryPg(),
  }),
})
router.get('/wallets', (req, res) => walletsController.getWallets(req, res))

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
export default router
