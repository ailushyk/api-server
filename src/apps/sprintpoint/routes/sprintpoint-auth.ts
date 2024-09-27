import { env } from '#env.ts'
import { createAuthMiddleware } from '#lib/auth/auth-middleware.ts'

const deprecated_config = {
  realm: env.auth.sprintpoint.AUTH_KEYCLOAK_REALM_SPRINTPOINT,
  'auth-server-url': env.auth.AUTH_KEYCLOAK_SERVER_URL,
  'ssl-required': 'external',
  resource: env.auth.sprintpoint.AUTH_KEYCLOAK_CLIENT_SPRINTPOINT,
  credentials: {
    secret: env.auth.sprintpoint.AUTH_KEYCLOAK_CLIENT_SECRET_SPRINTPOINT,
  },
  'confidential-port': env.auth.AUTH_KEYCLOAK_CONFIDENTIAL_PORT,
}

const config = {
  realm: env.auth.sprintpoint.AUTH_KEYCLOAK_REALM_SPRINTPOINT,
  'auth-server-url': env.auth.AUTH_KEYCLOAK_SERVER_URL,
  'ssl-required': 'external',
  resource: env.auth.sprintpoint.AUTH_KEYCLOAK_CLIENT_SPRINTPOINT,
  'bearer-only': true,
}

export const sprintpointAuth: ReturnType<typeof createAuthMiddleware> =
  createAuthMiddleware(deprecated_config)
