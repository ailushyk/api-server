import { Request, Response } from 'express'

import { CurrencyService } from '@/plutos/application/currency-service'

export class CurrencyController {
  private currencyService: CurrencyService
  constructor({ currencyService }: { currencyService: CurrencyService }) {
    this.currencyService = currencyService
  }

  async getCurrencies(req: Request, res: Response) {
    const data = await this.currencyService.all()
    res.json({ data })
  }
}
