import Keycloak from 'keycloak-connect'

import { sessionMemoryStore } from '@/config/session'
import { env } from '@/env'

const apiConfig = {
  realm: env.AUTH_KEYCLOAK_REALM,
  'auth-server-url': env.AUTH_KEYCLOAK_SERVER_URL,
  'ssl-required': 'external',
  resource: env.AUTH_KEYCLOAK_CLIENT,
  'public-client': true,
  'verify-token-audience': true,
  'use-resource-role-mappings': true,
  'confidential-port': 0,
}

export const keycloak = new Keycloak(
  {
    store: sessionMemoryStore,
  },
  apiConfig,
)
