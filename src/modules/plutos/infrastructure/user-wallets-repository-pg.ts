import { db } from '#config/database.ts'
import type {
  UserWalletsRepository,
  WalletInsert,
} from '#modules/plutos/application/wallet.ts'
import { wallet } from '#modules/plutos/infrastructure/schema/wallet-pg-schema.ts'
import { eq } from 'drizzle-orm'

export class UserWalletsRepositoryPg implements UserWalletsRepository {
  async all({ userId }: { userId: string }) {
    return db.select().from(wallet).where(eq(wallet.userId, userId))
  }

  async create(values: WalletInsert) {
    const [createdWallet] = await db.insert(wallet).values(values).returning({
      id: wallet.id,
      name: wallet.name,
    })
    return createdWallet || null
  }
}
