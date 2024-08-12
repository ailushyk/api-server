import { db } from '@/config/database'
import {
  UserWalletsRepository,
  WalletInsert,
} from '@/plutos/application/wallet'
import { wallet } from '@/plutos/infrastructure/schema/wallet-pg-schema'

export class UserWalletsRepositoryPg implements UserWalletsRepository {
  async all() {
    return db.select().from(wallet)
  }

  async create(values: WalletInsert) {
    const [createdWallet] = await db.insert(wallet).values(values).returning()
    return createdWallet
  }
}
