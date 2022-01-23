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

export interface PayWithTransfer {
    transactionRef: string,
    transactionId: number,
    amount: number,
    email: string,
    userId: string,
    deliveryId : string
}

export interface VerifyPayment {
    transactionRef: string,
    transactionId: number,
    amount: number,
    email: string,
    userId: string
}

  