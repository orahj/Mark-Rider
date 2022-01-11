export interface Login {
    email: string,
    password: string
}

export interface ResetLink {
    email: string
}

export interface ResetPassword {
    token: string,
    newPassword: string,
    email: string
}