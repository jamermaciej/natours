export interface ApiResponse<T> {
    status: string;
    message?: string;
    results?: number;
    data: {
        data: T
    };
}
