async function getUserWallets() {
  return [
    {
      id: 1,
      name: 'Wallet 1',
    },
    {
      id: 2,
      name: 'Wallet 2',
    },
  ]
}

export const UserWalletsService = {
  getUserWallets,
}
