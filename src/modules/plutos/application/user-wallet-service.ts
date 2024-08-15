import {
  UserWalletsRepository,
  WalletInsert,
} from '@/modules/plutos/application/wallet'

export class UserWalletService {
  private repository: UserWalletsRepository
  constructor({ repository }: { repository: UserWalletsRepository }) {
    this.repository = repository
  }

  async getUserWallets() {
    return this.repository.all()
  }

  async createWallet({ data }: { data: WalletInsert }) {
    // const user =
    return this.repository.create(data)
  }
}
