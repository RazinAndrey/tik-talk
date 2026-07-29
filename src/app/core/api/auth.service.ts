import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse, IRefreshTokenRequest } from '../interfaces/api/auth.model';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  private baseApiUrl = `${environment.apiUrl}/auth`;

  get isAuth(): boolean {
    return !!this.cookieService.get('token');
  }

  loginForAccessToken(body: ILoginRequest): Observable<ILoginResponse> {
    const fd = new FormData();
    fd.append('username', body.username);
    fd.append('password', body.password);

    return this.http.post<ILoginResponse>(`${this.baseApiUrl}/token`, fd).pipe(tap((value) => this.saveTokens(value)));
  }

  refreshToken(body: IRefreshTokenRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.baseApiUrl}/refresh`, body).pipe(
      tap((value) => this.saveTokens(value)),
      catchError((err: HttpErrorResponse) => {
        this.cookieService.deleteAll();
        this.router.navigate(['/login']);
        return throwError(() => err);
      }),
    );
  }

  logout(): Observable<string> {
    return this.http.post<string>(`${this.baseApiUrl}/logout`, {}).pipe(
      tap(() => {
        this.cookieService.deleteAll();
        this.router.navigate(['/login']);
      }),
    );
  }

  private saveTokens(value: ILoginResponse): void {
    this.cookieService.set('token', value.access_token);
    this.cookieService.set('refresh_token', value.refresh_token);
  }
}
