import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5217/api'; // ✅ Ensure this matches your .NET backend

  constructor(private http: HttpClient) {}

  getAdmins(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/admin/login`, 
      { email, password }, 
      { withCredentials: true } // ✅ Ensure credentials are sent if needed
    );
  }
 
  
  
}

