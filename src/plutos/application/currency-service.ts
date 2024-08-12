import { CurrencyRepository } from '@/plutos/application/currency'

export class CurrencyService {
  private repository: CurrencyRepository
  constructor({ repository }: { repository: CurrencyRepository }) {
    this.repository = repository
  }
  async all() {
    return this.repository.all()
  }
}
