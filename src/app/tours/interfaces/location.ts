export interface Location {
    _id: string;
    type: string;
    coordinates: number[];
    address: string;
    description: string;
    day: number;
}

export type StartLocation = Omit<Location, 'day'>;