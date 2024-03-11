import { ReviewUser } from "../../shared/interfaces/user";

export interface Review {
    id: string;
    _id: string;
    review: string;
    rating: number;
    user: ReviewUser;
    tour: string;
    cratedAt: string;
}