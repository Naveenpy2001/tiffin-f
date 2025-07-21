import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoyaltyPoint {
  id: number;
  userId: number;
  currentPoints: number;
  totalEarnedPoints: number;
  lastUpdated: string;
  loyaltyTier: string;
}

export interface RewardTransaction {
  id: number;
  userId: number;
  pointsChange: number;
  transactionType: string;
  source?: string;
  transactionTime: string;
  expiryDate?: string;
  status: string;
  relatedOrderId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RewardsService {
  private baseUrl = 'http://localhost:8940/api'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getLoyaltyPoints(userId: number): Observable<LoyaltyPoint> {
    return this.http.get<LoyaltyPoint>(`http://localhost:8930/giftcards/user/${userId}`);
  }

  getRewardTransactions(userId: number): Observable<RewardTransaction[]> {
    return this.http.get<RewardTransaction[]>(`${this.baseUrl}/reward-transactions/user/${userId}`);
  }

  redeemPoints(userId: number, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/redeem/${userId}`, { amount });
  }

  awardReferral(userId: number): Observable<RewardTransaction> {
    return this.http.post<RewardTransaction>(`${this.baseUrl}/referral-bonus/${userId}`, {});
  }

  reverseOrder(orderId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/reverse-reward/${orderId}`, {});
  }
}
