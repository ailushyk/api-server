import { Request, Response } from 'express'

import { UserWalletsService } from '@/plutos/application/wallets-service'

export class WalletsController {
  async getWallets(req: Request, res: Response) {
    console.log('GET /wallets', req)
    res.status(200).json({
      data: await UserWalletsService.getUserWallets(),
    })
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
