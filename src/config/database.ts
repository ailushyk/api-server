import { deck } from '#apps/sprintpoint/infrastructure/schema/deck-schema-pg.ts'
import {
  session,
  sessionRelations,
  userToSession,
  userToSessionRelations,
} from '#apps/sprintpoint/infrastructure/schema/session-schema-pg.ts'
import { env } from '#env.ts'
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
