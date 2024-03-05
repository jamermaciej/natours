export interface Review {
    id: string;
    _id: string;
    review: string;
    rating: number;
    user: {
        _id: string;
        name: string;
        photo: string;
    };
    tour: string;
    cratedAt: string;
}