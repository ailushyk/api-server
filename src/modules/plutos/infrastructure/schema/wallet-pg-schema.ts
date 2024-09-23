import { plutosPgTable } from '#modules/plutos/infrastructure/plutos-pg-table.ts'
import { currency } from '#modules/plutos/infrastructure/schema/currency-pg-schema.ts'
import { walletType } from '#modules/plutos/infrastructure/schema/wallet-type-pg-schema.ts'
import { sql } from 'drizzle-orm'
import { decimal, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const wallet = plutosPgTable('wallet', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  typeId: uuid('typeId').references(() => walletType.id),
  balance: decimal('balance', {
    precision: 19,
    scale: 4,
  })
    .default('0')
    .notNull(),
  currency: text('currency')
    .notNull()
    .references(() => currency.code),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
})
