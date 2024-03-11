import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);
  #userUrl = '/users/';

  login(email: string, password: string): Observable<ApiResponse<User>> {
    return this.#http.post<ApiResponse<User>>(`${this.#userUrl}login`, { email, password });
  }
}
