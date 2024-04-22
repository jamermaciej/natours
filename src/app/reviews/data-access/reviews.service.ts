import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiEndpoint } from '../../shared/constants/constants';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { Review, ReviewBody, ReviewResponse } from '../../tours/interfaces/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  #http = inject(HttpClient);

  getMyReviews(): Observable<ApiResponse<ReviewResponse[]>> {
    return this.#http.get<ApiResponse<ReviewResponse[]>>(apiEndpoint.ReviewEndpoint.getMyReviews, { withCredentials: true });
  }

  removeReview(id: string) {
    return this.#http.delete(`${apiEndpoint.ReviewEndpoint.baseReviews}/${id}`, { withCredentials: true });
  }

  updateReview(review: ReviewBody): Observable<ApiResponse<ReviewResponse>> {
    return this.#http.patch<ApiResponse<ReviewResponse>>(`${apiEndpoint.ReviewEndpoint.baseReviews}/${review.id}`, review, { withCredentials: true });
  }

  addReview(review: ReviewBody): Observable<ApiResponse<ReviewResponse>> {
    return this.#http.post<ApiResponse<ReviewResponse>>(apiEndpoint.ReviewEndpoint.baseReviews, review, { withCredentials: true });
  }
}
