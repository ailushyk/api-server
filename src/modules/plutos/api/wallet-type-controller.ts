import { WalletTypeService } from '#modules/plutos/application/wallet-type-service.ts'
import type { Request, Response } from 'express'

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
