import SQLite from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

import { DATABASE_URL } from '@/constans'

export const sqlite = new SQLite(DATABASE_URL)
export const db = drizzle(sqlite)
