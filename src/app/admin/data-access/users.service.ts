import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../../shared/constants/constants';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { User, UserBody } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  #http = inject(HttpClient);

  getAllUsers(filters?: any, page = 1, limit = 10): Observable<ApiResponse<User[]>> {
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('limit', limit);
    params = params.set('sort', 'name');

    if (filters) {
      if (filters.role) {
        params = params.set('role', filters.role);
      }
  
      if (filters.query) {
        params = params.set('q', filters.query);
      }
    }

    return this.#http.get<ApiResponse<User[]>>(apiEndpoint.UserEndpoint.baseUser, { params, withCredentials: true });
  }

  getUser(id: string): Observable<ApiResponse<User>> {
    return this.#http.get<ApiResponse<User>>(`${apiEndpoint.UserEndpoint.baseUser}/${id}`, { withCredentials: true });
  }

  updateUser(user: UserBody, id: string): Observable<ApiResponse<User>> {
    return this.#http.patch<ApiResponse<User>>(`${apiEndpoint.UserEndpoint.baseUser}/${id}`, user, { withCredentials: true });
  }

  addUser(user: UserBody): Observable<ApiResponse<User>> {
    return this.#http.post<ApiResponse<User>>(`${apiEndpoint.UserEndpoint.baseUser}`, user, { withCredentials: true });
  }

  checkEmail(email: string, excludeId?: string): Observable<{ exists: boolean }> {
    let params = new HttpParams().set('email', email);

    if (excludeId) {
      params = params.set('excludeId', excludeId);
    }

    return this.#http.get<{ exists: boolean }>(`${apiEndpoint.UserEndpoint.checkEmail}`, { params, withCredentials: true, });
  }
}
