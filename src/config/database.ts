import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

import { deck } from '@/apps/sprintpoint/infrastructure/schema/deck-schema-pg'
import {
  session,
  sessionRelations,
  userToSession,
  userToSessionRelations,
} from '@/apps/sprintpoint/infrastructure/schema/session-schema-pg'
import { env } from '@/env'

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
