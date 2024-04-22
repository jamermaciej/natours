import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response';
import { User } from '../../interfaces/user';
import { apiEndpoint } from '../../constants/constants';
import { SignupData } from '../../interfaces/signup-data';
import GlobalFunctions from '../../helpers/GlobalFunctions';
import { PasswordUpdateData } from '../../interfaces/password-update-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);

  signup(signupData: SignupData): Observable<ApiResponse<User>> {
    return this.#http.post<ApiResponse<User>>(apiEndpoint.AuthEndpoint.signup, signupData, { withCredentials: true });
  }

  login(email: string, password: string): Observable<ApiResponse<User>> {
    return this.#http.post<ApiResponse<User>>(apiEndpoint.AuthEndpoint.login, { email, password }, { withCredentials: true });
  }

  logout() {
    return this.#http.get(apiEndpoint.AuthEndpoint.logout, { withCredentials: true });
  }

  getMe(): Observable<ApiResponse<User>> {
    return this.#http.get<ApiResponse<User>>(apiEndpoint.AuthEndpoint.me, { withCredentials: true });
  }

  updateMe(user: User): Observable<ApiResponse<User>> {
    const formData: FormData = GlobalFunctions.convertToFormData(user);

    return this.#http.patch<ApiResponse<User>> (`${apiEndpoint.AuthEndpoint.updateMe}`, formData, { withCredentials: true });
  }

  updatePassword(passwordUpdateData: PasswordUpdateData): Observable<ApiResponse<User>> {
    return this.#http.patch<ApiResponse<User>> (`${apiEndpoint.AuthEndpoint.updatePassword}`, passwordUpdateData, { withCredentials: true });
  }
}
