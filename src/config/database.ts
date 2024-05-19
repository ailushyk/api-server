import Database from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'

import { User } from '../models/user'

interface DatabaseSchema {
  user: User
}

const database = new Database(process.env.DB_FILE || ':memory:')

const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({ database: database }),
})

export { db }
