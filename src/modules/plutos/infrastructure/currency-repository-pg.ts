import { db } from '@/config/database'
import { CurrencyRepository } from '@/modules/plutos/application/currency'
import { currency } from '@/modules/plutos/infrastructure/schema/currency-pg-schema'

export class CurrencyRepositoryPg implements CurrencyRepository {
  async all() {
    return db.select().from(currency)
  }
}
