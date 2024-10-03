import { env } from '#core/env.ts'
import {
  createAuthMiddleware,
  type AuthMiddleware,
} from '#lib/auth/auth-middleware.ts'

const config = {
  realm: env.auth.sprintpoint.AUTH_KEYCLOAK_REALM_SPRINTPOINT,
  'auth-server-url': env.auth.AUTH_KEYCLOAK_SERVER_URL,
  'ssl-required': 'external',
  resource: env.auth.sprintpoint.AUTH_KEYCLOAK_CLIENT_SPRINTPOINT,
  credentials: {
    secret: env.auth.sprintpoint.AUTH_KEYCLOAK_CLIENT_SECRET_SPRINTPOINT,
  },
  'confidential-port': env.auth.AUTH_KEYCLOAK_CONFIDENTIAL_PORT,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bearerOnlyConfig = {
  realm: env.auth.sprintpoint.AUTH_KEYCLOAK_REALM_SPRINTPOINT,
  'auth-server-url': env.auth.AUTH_KEYCLOAK_SERVER_URL,
  'ssl-required': 'external',
  resource: env.auth.sprintpoint.AUTH_KEYCLOAK_CLIENT_SPRINTPOINT,
  'bearer-only': true,
}

export const sprintpointAuth: AuthMiddleware = createAuthMiddleware(config)
