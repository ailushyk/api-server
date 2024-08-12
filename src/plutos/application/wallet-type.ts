import { walletType } from '@/plutos/infrastructure/schema/wallet-type-pg-schema'

type WalletType = typeof walletType.$inferSelect

export interface WalletTypeRepository {
  all(): Promise<WalletType[]>
}
