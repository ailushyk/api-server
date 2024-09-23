import * as express from 'express'
import KeycloakConnect, {
  type GuardFn,
  type KeycloakConfig,
} from 'keycloak-connect'

export const createAuthMiddleware = (config: KeycloakConfig | string) => {
  const k = new KeycloakConnect({}, config)
  return {
    middleware: () => k.middleware(),
    protect: (spec?: GuardFn | string): express.RequestHandler => {
      return k.protect(spec)
    },
  }
}
