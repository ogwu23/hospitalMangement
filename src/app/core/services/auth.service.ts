import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private useMockAPI = true; // Switch to false for real backend
  private mockAPIURL = 'https://<your-mockapi-url>/auth';
  private backendURL = 'https://your-backend-api.com/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = this.useMockAPI ? this.mockAPIURL : this.backendURL;

    if (this.useMockAPI) {
      // Simulate mock response
      if (email === 'admin@example.com' && password === 'admin') {
        return of({ token: 'mock-token' }).pipe(
          tap(res => localStorage.setItem('token', res.token))
        );
      }
      return throwError(() => new Error('Invalid credentials'));
    }

    return this.http.post(`${url}/login`, { email, password }).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
