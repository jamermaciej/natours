import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { Tour } from '../interfaces/tour';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  #http = inject(HttpClient);
  #apiUrl = environment.apiUrl;
  #tourUrl = '/tours';

  getTours(): Observable<ApiResponse<Tour[]>> {
    return this.#http.get<ApiResponse<Tour[]>>(`${this.#apiUrl}${this.#tourUrl}`);
  }
}
