import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReviewDTO {
  userId: number;
  mealId: number;
  orderId: number;
  rating: number;
  comment: string;
  photoUrls: string[];
  status: string;
}

export interface Review {
  id: number;
  userId: number;
  mealId: number;
  orderId: number;
  rating: number;
  comment: string;
  photoUrls: string[];
  likes: number;
  dislikes: number;
  status: string;
  comments: ReviewComment[];
}

export interface ReviewComment {
  id: number;
  userId: number;
  reviewId: number;
  comment: string;
  status: string;
}

export interface ReviewCommentDTO {
  userId: number;
  reviewId: number;
  comment: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8950/api/reviews';

  constructor(private http: HttpClient) {}

  getReviewsByMeal(mealId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/meal/${mealId}`);
  }

  addReview(reviewDTO: ReviewDTO): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/reviewsSave`, reviewDTO);
  }

  addComment(commentDTO: ReviewCommentDTO): Observable<ReviewComment> {
    return this.http.post<ReviewComment>(`${this.baseUrl}/commentsSave`, commentDTO);
  }

  getCommentsByReview(reviewId: number): Observable<ReviewComment[]> {
    return this.http.get<ReviewComment[]>(`${this.baseUrl}/commentsGetById/${reviewId}`);
  }
}