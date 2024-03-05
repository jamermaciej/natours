import { Role } from "../enums/role";

export interface Guide {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: Role;
}