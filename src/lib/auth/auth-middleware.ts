import e from 'express'
import KeycloakConnect from 'keycloak-connect'

import { keycloak } from '@/config/keycloak'

class AuthMiddleware {
  private keycloak: KeycloakConnect.Keycloak

  constructor({ keycloak }: { keycloak: KeycloakConnect.Keycloak }) {
    this.keycloak = keycloak
  }

  middleware(): e.RequestHandler[] {
    return this.keycloak.middleware()
  }

  protect(spec?: KeycloakConnect.GuardFn | string): e.RequestHandler {
    // TODO: Implement protect method to use keycloak.protect
    // return this.keycloak.protect(spec)
    return (req, res, next) => next()
  }
}

export const authMiddleware = new AuthMiddleware({ keycloak })
