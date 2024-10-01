import { Difficulty } from "../enums/difficulty";
import { Guide } from "./guide"
import { Location, StartLocation } from "./location";
import { ReviewResponse } from "./review";
import { StartDate } from "./start-date";

export interface Tour {
    _id: string;
    id: string;
    name: string;
    slug: string;
    duration: number;
    maxGroupSize: number;
    difficulty: Difficulty;
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    priceDiscount: number;
    summary: string;
    description: string;
    imageCover: string;
    images: string[];
    createdAt: Date;
    startDates: StartDate[];
    secretTour: boolean;
    startLocation: StartLocation;
    locations: Location[];
    guides: Guide[];
    reviews: ReviewResponse[];
}