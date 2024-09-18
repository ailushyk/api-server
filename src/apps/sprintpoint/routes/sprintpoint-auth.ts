import { createAuthMiddleware } from '@/lib/auth/auth-middleware'
import { env } from '@/env'

const config = {
  realm: env.auth.sprintpoint.AUTH_KEYCLOAK_REALM_SPRINTPOINT,
  'auth-server-url': env.auth.AUTH_KEYCLOAK_SERVER_URL,
  'ssl-required': 'external',
  resource: env.auth.sprintpoint.AUTH_KEYCLOAK_CLIENT_SPRINTPOINT,
  credentials: {
    secret: 'dFEwAGju1h9bJsPV4YTZNb6SANvlNuT4',
  },
  'confidential-port': 0,
}
export const sprintpointAuth = createAuthMiddleware(config)
