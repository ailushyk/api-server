import { wallet } from '#modules/plutos/infrastructure/schema/wallet-pg-schema.ts'

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
  all({ userId }: { userId: string }): Promise<Wallet[]>
  create(wallet: WalletInsert): Promise<{ id: string; name: string } | null>
}
