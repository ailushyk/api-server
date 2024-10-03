import * as express from 'express'
import KeycloakConnect, {
  type GuardFn,
  type KeycloakConfig,
} from 'keycloak-connect'

export interface AuthMiddleware {
  middleware: () => express.RequestHandler[]
  protect: (spec?: GuardFn | string) => express.RequestHandler
}

export const createAuthMiddleware = (
  config: KeycloakConfig | string,
): AuthMiddleware => {
  const keycloak = new KeycloakConnect({}, config)
  return {
    middleware: () => keycloak.middleware(),
    protect: (spec?: GuardFn | string): express.RequestHandler => {
      return keycloak.protect(spec)
    },
  }
}
