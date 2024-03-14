import { environment } from "../../../environments/environment";

export const constants = {
    CURRENT_USER: 'CURRENT_USER',
};

export const apiEndpoint = {
    AuthEndpoint: {
        login: `${environment.apiUrl}/users/login`,
        logout: `${environment.apiUrl}/users/logout`,
    },
    TourEndpoint: {
        getAllTours: `${environment.apiUrl}/tours`,
    }
}