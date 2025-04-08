import { Pagination } from "./pagination";

export interface ApiResponse<T> {
    status: string;
    message?: string;
    results?: number;
    pagination: Pagination
    data: {
        data: T
    };
}
