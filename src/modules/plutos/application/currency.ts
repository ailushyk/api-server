import { currency } from '#modules/plutos/infrastructure/schema/currency-pg-schema.ts'

type Currency = typeof currency.$inferSelect

export interface CurrencyRepository {
  all(): Promise<Currency[]>
}
