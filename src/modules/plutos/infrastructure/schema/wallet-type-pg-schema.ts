import { sql } from 'drizzle-orm'
import { text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { plutosPgTable } from '@/modules/plutos/infrastructure/plutos-pg-table'

export const walletType = plutosPgTable('wallet_type', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt')
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
})
