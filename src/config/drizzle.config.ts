import 'dotenv/config'

import { defineConfig } from 'drizzle-kit'

import { DATABASE_URL } from '@/constans'

export default defineConfig({
  schema: './src/*/infrastructure/schema/*',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: `file:${DATABASE_URL}`,
  },
  verbose: true,
  strict: true,
})
