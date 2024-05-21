import { Kysely, sql } from 'kysely'

import { db } from '@/config/database'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
  console.log('Creating table users')
  await db.schema
    .createTable('user')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('createdAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('updatedAt', 'text', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('metadata', 'json', (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
