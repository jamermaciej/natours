import { Role } from "../../tours/enums/role";
import { Tour } from "../../tours/interfaces/tour";

export interface User {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: Role;
}

export type ReviewUser = Pick<User, '_id' | 'name' | 'photo'>;

export type ReviewTour = Pick<Tour, '_id' | 'name' | 'slug'>;