import 'dotenv/config'

import { defineConfig } from 'drizzle-kit'

import { env } from '@/env'

export default defineConfig({
  schema: './src/*/infrastructure/schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    ssl: false,
  },
  verbose: true,
  strict: true,
})
