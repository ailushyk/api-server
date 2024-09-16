import { pgTableCreator } from 'drizzle-orm/pg-core'

export const sprintPointPgTable = pgTableCreator((name) => `sp_${name}`)
