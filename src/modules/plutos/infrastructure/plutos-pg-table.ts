import { pgTableCreator } from 'drizzle-orm/pg-core'

export const plutosPgTable = pgTableCreator((name) => `plutos_${name}`)
