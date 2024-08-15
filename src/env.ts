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

export const env = {
  ...dbConfig,
  ...keycloak,
}
