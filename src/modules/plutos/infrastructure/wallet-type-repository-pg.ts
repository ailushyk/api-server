import { db } from '@/config/database'
import { WalletTypeRepository } from '@/modules/plutos/application/wallet-type'
import { walletType } from '@/modules/plutos/infrastructure/schema/wallet-type-pg-schema'

export class WalletTypeRepositoryPg implements WalletTypeRepository {
  async all() {
    return db.select().from(walletType)
  }
}
