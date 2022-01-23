export interface UpdateUser {
    email: string,
    firstName: string,
    lastName: string,
    avatar: string,
    phone: string,
}

export interface UpdateRiderBankInfo {
    appUserId: string,
    accountNumber: string,
    bankCode: string,
    bvn: string,
    validID: string
}

export interface UpdateGuarantorInfo {
    riderId: number,
    firstName: string,
    lastName: string,
    nin: string
}

export interface RiderOnlineStatus {
    userId: string,
    status: boolean
}

export interface BVNLookUp {
    bvn: string,
    account_number: string,
    bank_code: string,
    first_name: string,
    last_name: string,
    middle_name: string
}