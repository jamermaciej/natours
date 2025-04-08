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
    // ?page=1 ?limit=3 ?role=user

    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('limit', limit);
    params = params.set('sort', 'role');

    return this.#http.get<ApiResponse<User[]>>(apiEndpoint.UserEndpoint.getAllUsers, { params, withCredentials: true });
  }
}
