import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VoucherService {
  private baseUrl = 'http://localhost:8930/vouchers';

  constructor(private http: HttpClient) {}

  

  getVoucherByCodes(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/byCode/${code}`);
  }
  getallvouchers(){
    return this.http.get<any>('http://localhost:8930/vouchers/getall');
  }
}

