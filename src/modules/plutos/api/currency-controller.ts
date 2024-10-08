import { CurrencyService } from '#modules/plutos/application/currency-service.ts'
import type { Request, Response } from 'express'

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
