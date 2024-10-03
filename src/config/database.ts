import { env } from '#core/env.ts'
import { deck } from '#sprintpoint/infrastructure/schema/deck-schema-pg.ts'
import {
  session,
  sessionRelations,
  userToSession,
  userToSessionRelations,
} from '#sprintpoint/infrastructure/schema/session-schema-pg.ts'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

const { Pool } = pg
const client = new Pool({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
})

export const db = drizzle(client, {
  schema: {
    deck,
    session,
    userToSession,
    sessionRelations,
    userToSessionRelations,
  },
})
