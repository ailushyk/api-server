import type { CurrencyRepository } from '#modules/plutos/application/currency.ts'

export class CurrencyService {
  private repository: CurrencyRepository
  constructor({ repository }: { repository: CurrencyRepository }) {
    this.repository = repository
  }
  async all() {
    return this.repository.all()
  }
}
