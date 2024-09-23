import { db } from '#config/database.ts'
import type { CurrencyRepository } from '#modules/plutos/application/currency.ts'
import { currency } from '#modules/plutos/infrastructure/schema/currency-pg-schema.ts'

export class CurrencyRepositoryPg implements CurrencyRepository {
  async all() {
    return db.select().from(currency)
  }
}
