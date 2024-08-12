import { Request, Response } from 'express'

import { logger } from '@/lib/logger'
import { UserWalletService } from '@/plutos/application/user-wallet-service'

export class WalletsController {
  private userWalletsService: UserWalletService
  constructor({
    userWalletsService,
  }: {
    userWalletsService: UserWalletService
  }) {
    this.userWalletsService = userWalletsService
  }

  async getWallets(req: Request, res: Response) {
    try {
      const data = await this.userWalletsService.getUserWallets()
      res.status(200).json({
        data,
      })
    } catch (error) {
      logger.error('An error occurred while fetching the user wallets.', error)
      res.status(500).json({
        error: 'Something went wrong!',
      })
    }
  }

  async createWallet() {
    throw new Error('Not implemented')
  }

  async getWallet() {
    throw new Error('Not implemented')
  }

  async updateWallet() {
    throw new Error('Not implemented')
  }

  async deleteWallet() {
    throw new Error('Not implemented')
  }
}
