import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiEndpoint } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  #http = inject(HttpClient);

  bookTour(tourId: string){
    return this.#http.get(`${apiEndpoint.BookingEndpoint.bookTour}${tourId}`, { withCredentials: true });
  }
}
