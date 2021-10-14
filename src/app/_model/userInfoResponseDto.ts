export interface UserInfoResponseDto {
    email: string;
    id: string;
    address: string;
    dateRegistered: Date;
    firstName: string;
    lastName: string;
    phone: string;
    avatar: string;
    bankAccountNumber: string;
    bankName: string;
    stateName: string;
}

export interface UserLogin{
    Email:string;
    Password:string;
}
