import { wallet } from '@/modules/plutos/infrastructure/schema/wallet-pg-schema'

export enum WalletTypeValue {
  CheckingAccount = 'Checking Account',
  SavingsAccount = 'Savings Account',
  CreditCard = 'Credit Card',
  Loan = 'Loan',
  Cash = 'Cash',
  InvestmentAccount = 'Investment Account',
  RetirementAccount = 'Retirement Account',
  CryptocurrencyWallet = 'Cryptocurrency Wallet',
  PrepaidCard = 'Prepaid Card',
  BusinessAccount = 'Business Account',
}

export type Wallet = typeof wallet.$inferSelect
export type WalletInsert = typeof wallet.$inferInsert

export interface UserWalletsRepository {
  all(): Promise<Wallet[]>
  create(wallet: WalletInsert): Promise<Wallet | null>
}
