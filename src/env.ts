import { z } from 'zod'

const dbConfig = {
  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_PORT: Number(process.env.DATABASE_PORT || ''),
  DATABASE_USER: process.env.DATABASE_USER || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
}

const keycloak = {
  AUTH_SECRET: process.env.AUTH_SECRET || 'secret',
  AUTH_KEYCLOAK_SERVER_URL: process.env.AUTH_KEYCLOAK_SERVER_URL || '',
  AUTH_KEYCLOAK_REALM: process.env.AUTH_KEYCLOAK_REALM || '',
  AUTH_KEYCLOAK_CLIENT: process.env.AUTH_KEYCLOAK_CLIENT || '',
}
const authSchema = z.object({
  AUTH_KEYCLOAK_SERVER_URL: z.string(),
  AUTH_SECRET: z.string(),
  plutos: z.object({
    AUTH_KEYCLOAK_REALM_PLUTOS: z.string(),
    AUTH_KEYCLOAK_CLIENT_PLUTOS: z.string(),
  }),
  sprintpoint: z.object({
    AUTH_KEYCLOAK_REALM_SPRINTPOINT: z.string(),
    AUTH_KEYCLOAK_CLIENT_SPRINTPOINT: z.string(),
  }),
})
const auth = {
  AUTH_KEYCLOAK_SERVER_URL: process.env.AUTH_KEYCLOAK_SERVER_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  plutos: {
    AUTH_KEYCLOAK_REALM_PLUTOS: process.env.AUTH_KEYCLOAK_REALM_PLUTOS,
    AUTH_KEYCLOAK_CLIENT_PLUTOS: process.env.AUTH_KEYCLOAK_CLIENT_PLUTOS,
  },
  sprintpoint: {
    AUTH_KEYCLOAK_REALM_SPRINTPOINT:
      process.env.AUTH_KEYCLOAK_REALM_SPRINTPOINT,
    AUTH_KEYCLOAK_CLIENT_SPRINTPOINT:
      process.env.AUTH_KEYCLOAK_CLIENT_SPRINTPOINT,
  },
}
export const env = {
  ...dbConfig,
  ...keycloak,
  auth: authSchema.parse(auth),
}
