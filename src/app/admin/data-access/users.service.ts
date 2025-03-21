import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../../shared/constants/constants';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  #http = inject(HttpClient);

  getAllUsers(page = 1, limit = 10): Observable<ApiResponse<User[]>> {
    return this.#http.get<ApiResponse<User[]>>(apiEndpoint.UserEndpoint.getAllUsers, { withCredentials: true });
  }
}
