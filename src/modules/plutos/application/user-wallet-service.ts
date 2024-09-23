import type {
  UserWalletsRepository,
  WalletInsert,
} from '#modules/plutos/application/wallet.ts'

export class UserWalletService {
  private repository: UserWalletsRepository
  constructor({ repository }: { repository: UserWalletsRepository }) {
    this.repository = repository
  }

  async getUserWallets(params: { userId: string }) {
    return this.repository.all(params)
  }

  async createWallet(data: WalletInsert) {
    // TODO: Validate data
    return this.repository.create(data)
  }
}
