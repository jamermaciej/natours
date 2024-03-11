import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { Tour } from '../interfaces/tour';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  #http = inject(HttpClient);
  #tourUrl = '/tours';

  getTours(): Observable<ApiResponse<Tour[]>> {
    return this.#http.get<ApiResponse<Tour[]>>(`${this.#tourUrl}`);
  }
}
