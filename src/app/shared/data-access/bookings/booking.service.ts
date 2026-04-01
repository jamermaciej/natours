import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiEndpoint } from '../../constants/constants';
import { ApiResponse } from '../../interfaces/api-response';

import { Observable } from 'rxjs';
import { BookingStatus } from '../../../tours/enums/booking-status';
import { CancelBookingRequest } from '../../../admin/interfaces/cancel-booking-request';
import { RefundBookingData } from '../../../admin/interfaces/refund-booking-data';
import { Booking } from '../../interfaces/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  #http = inject(HttpClient);

  bookTour(tourId: string, date: Date) {
    return this.#http.get(`${apiEndpoint.BookingEndpoint.bookTour}${tourId}/${date}`, {
      withCredentials: true,
    });
  }

  refundPayment(bookingId: string, data: RefundBookingData): Observable<ApiResponse<Booking>> {
    return this.#http.post<ApiResponse<Booking>>(
      `${apiEndpoint.BookingEndpoint.baseBooking}/${bookingId}/refund`,
      data,
      {
        withCredentials: true,
      },
    );
  }

  getMyBookings(): Observable<ApiResponse<Booking[]>> {
    return this.#http.get<ApiResponse<Booking[]>>(apiEndpoint.BookingEndpoint.getMyBookings, {
      withCredentials: true,
    });
  }

  checkTourBookingStatus(tourId: string) {
    return this.#http.get<ApiResponse<{ status: BookingStatus | null }>>(
      `${apiEndpoint.BookingEndpoint.baseBooking}/tour/${tourId}/status`,
      {
        withCredentials: true,
      },
    );
  }

  getAllBookings(): Observable<ApiResponse<Booking[]>> {
    return this.#http.get<ApiResponse<Booking[]>>(apiEndpoint.BookingEndpoint.baseBooking, {
      withCredentials: true,
    });
  }

  removeBooking(id: string) {
    return this.#http.delete(`${apiEndpoint.BookingEndpoint.baseBooking}/${id}`, {
      withCredentials: true,
    });
  }

  getBooking(id: string): Observable<ApiResponse<Booking>> {
    return this.#http.get<ApiResponse<Booking>>(
      `${apiEndpoint.BookingEndpoint.baseBooking}/${id}`,
      { withCredentials: true },
    );
  }

  updateBooking(booking: Booking): Observable<ApiResponse<Booking>> {
    return this.#http.patch<ApiResponse<Booking>>(
      `${apiEndpoint.BookingEndpoint.baseBooking}/${booking._id}`,
      booking,
      {
        withCredentials: true,
      },
    );
  }

  cancelBooking(id: string, data: CancelBookingRequest): Observable<ApiResponse<Booking>> {
    return this.#http.post<ApiResponse<Booking>>(
      `${apiEndpoint.BookingEndpoint.baseBooking}/${id}/cancel`,
      data,
      {
        withCredentials: true,
      },
    );
  }
}
