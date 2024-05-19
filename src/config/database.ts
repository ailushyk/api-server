import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'

import { UserTable } from '../domain/models/user'

const database = new SQLite(process.env.DB_FILE || ':memory:')

export interface DatabaseSchema {
  user: UserTable
}

export const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({ database }),
})
