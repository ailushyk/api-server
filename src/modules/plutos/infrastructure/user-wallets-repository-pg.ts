import { eq } from 'drizzle-orm'

import { db } from '@/config/database'
import {
  UserWalletsRepository,
  WalletInsert,
} from '@/modules/plutos/application/wallet'
import { wallet } from '@/modules/plutos/infrastructure/schema/wallet-pg-schema'

export class UserWalletsRepositoryPg implements UserWalletsRepository {
  async all({ userId }: { userId: string }) {
    return db.select().from(wallet).where(eq(wallet.userId, userId))
  }

  async create(values: WalletInsert) {
    const [createdWallet] = await db.insert(wallet).values(values).returning({
      id: wallet.id,
      name: wallet.name,
    })
    return createdWallet
  }
}
