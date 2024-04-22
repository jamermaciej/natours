import { environment } from "../../../environments/environment";

export const constants = {
    CURRENT_USER: 'CURRENT_USER',
};

export const apiEndpoint = {
    AuthEndpoint: {
        signup: `${environment.apiUrl}/users/signup`,
        login: `${environment.apiUrl}/users/login`,
        logout: `${environment.apiUrl}/users/logout`,
        me: `${environment.apiUrl}/users/me`,
        updateMe: `${environment.apiUrl}/users/updateMe`,
        updatePassword: `${environment.apiUrl}/users/updateMyPassword`,
    },
    TourEndpoint: {
        getAllTours: `${environment.apiUrl}/tours`,
        getMyTours: `${environment.apiUrl}/tours/my-tours`
    },
    BookingEndpoint: {
        bookTour: `${environment.apiUrl}/bookings/checkout-session/`,
    },
    ReviewEndpoint: {
        baseReviews: `${environment.apiUrl}/reviews`,
        getMyReviews: `${environment.apiUrl}/reviews/my-reviews`,
    }
}