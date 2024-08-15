import { sqliteTableCreator } from 'drizzle-orm/sqlite-core'

export const sbSqliteTable = sqliteTableCreator((name) => `sb_${name}`)
