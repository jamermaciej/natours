import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiEndpoint } from '../../constants/constants';
import { ApiResponse } from '../../interfaces/api-response';
import { Booking } from '../../../bookings/interfaces/booking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  #http = inject(HttpClient);

  bookTour(tourId: string, date: Date){
    return this.#http.get(`${apiEndpoint.BookingEndpoint.bookTour}${tourId}/${date}`, { withCredentials: true });
  }

  getMyBookings(): Observable<ApiResponse<Booking[]>> {
    return this.#http.get<ApiResponse<Booking[]>>(apiEndpoint.BookingEndpoint.getMyBookings, { withCredentials: true });
  }
}
