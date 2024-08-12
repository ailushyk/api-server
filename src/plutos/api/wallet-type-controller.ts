import { Request, Response } from 'express'

import { WalletTypeService } from '@/plutos/application/wallet-type-service'

export class WalletTypeController {
  private walletTypeService: WalletTypeService

  constructor(param: { walletTypeService: WalletTypeService }) {
    this.walletTypeService = param.walletTypeService
  }

  async all(req: Request, res: Response) {
    const data = await this.walletTypeService.all()
    res.json({ data })
  }
}
