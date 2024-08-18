import { Request, Response } from 'express'

import { getUserIdFromRequest } from '@/lib/auth'
import { logger } from '@/lib/logger'
import { UserWalletService } from '@/modules/plutos/application/user-wallet-service'

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
      const data = await this.userWalletsService.getUserWallets({
        userId: getUserIdFromRequest(req),
      })
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

  async createWallet(req: Request, res: Response) {
    const userId = getUserIdFromRequest(req)
    const data = await req.body
    const result = await this.userWalletsService.createWallet({
      ...data,
      userId,
    })
    res.status(201).json({
      data: result,
    })
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
