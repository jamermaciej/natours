import { Role } from "../../tours/enums/role";

export interface User {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: Role;
}

export type ReviewUser = Pick<User, '_id' | 'name' | 'photo'>;