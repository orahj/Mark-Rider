export interface CreateDelivery {
        email: string,
        deliveryItems: []
}

export interface CancelDelivery {
        appUserId: string,
        deliveriesId: 0,
        reason: string
 }

export interface StartDelivery  {
        appUserId: string,
        deliveriesId: number
}

export interface CompletedDelivery {
        appUserId: string,
        deliveriesId: number
}

export interface EndDelivery {
        appUserId: string,
        deliveriesId: number
}