import { db } from '#config/database.ts'
import type { WalletTypeRepository } from '#modules/plutos/application/wallet-type.ts'
import { walletType } from '#modules/plutos/infrastructure/schema/wallet-type-pg-schema.ts'

export class WalletTypeRepositoryPg implements WalletTypeRepository {
  async all() {
    return db.select().from(walletType)
  }
}
