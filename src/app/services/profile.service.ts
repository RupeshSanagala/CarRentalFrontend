import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:5217/api/users/profile'; // API endpoint

  constructor(private http: HttpClient) {}

  getUserProfile(headers: HttpHeaders): Observable<any> {
    return this.http.get(this.apiUrl, { headers });
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, userData);
  }
}

