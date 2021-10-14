export interface ApiResponse<T> {
    isSuccessful: boolean;
    message: string;
    responseData: T;
    statusCode: string;
}