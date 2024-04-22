import { ReviewTour, ReviewUser } from "../../shared/interfaces/user";

export interface ReviewResponse {
    id: string;
    review: string;
    rating: number;
    user: ReviewUser;
    tour: ReviewTour;
    cratedAt: string;
}

export interface Review {
    id: string | undefined;
    review: string;
    rating: number;
    user: string;
    tour: string;
    cratedAt: string;
}

export type ReviewBody = Pick<Review, 'id' | 'user' | 'tour' | 'review' | 'rating'>;