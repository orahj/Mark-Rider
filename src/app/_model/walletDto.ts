export interface FundWallet {
    email: string,
    amount: number,
    userId: string,
    transactionRef: string
}

export interface PayWithWallet {
    transactionRef: string,
    transactionId: number,
    amount: number,
    email: string,
    userId: string
  }
  