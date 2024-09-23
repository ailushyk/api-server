import { walletType } from '#modules/plutos/infrastructure/schema/wallet-type-pg-schema.ts'

type WalletType = typeof walletType.$inferSelect

export interface WalletTypeRepository {
  all(): Promise<WalletType[]>
}
