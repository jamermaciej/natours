import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { User } from '../../interfaces/user';
import { apiEndpoint } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);

  login(email: string, password: string): Observable<ApiResponse<User>> {
    return this.#http.post<ApiResponse<User>>(apiEndpoint.AuthEndpoint.login, { email, password }, { withCredentials: true });
  }

  logout() {
    return this.#http.get(apiEndpoint.AuthEndpoint.logout, { withCredentials: true });
  }

  getMe(): Observable<ApiResponse<User>> {
    return this.#http.get<ApiResponse<User>>(apiEndpoint.AuthEndpoint.me, { withCredentials: true });
  }
}
