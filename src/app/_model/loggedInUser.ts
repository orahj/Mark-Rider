export interface LoggedInUser {
    id: string;
    email: string;
    address: string;
    dateRegistered: Date;
    firstName: string;
    lastName: string;
    phone: string;
    token: string;
    avatar: string;
    roles: string[];
}

