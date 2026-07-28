import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse, IRefreshTokenRequest } from '../interfaces/api/auth.model';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private baseApiUrl = `${environment.apiUrl}/auth`;

  get isAuth(): boolean {
    const token = this.cookieService.get('token');
    return token ? true : false;
  }

  loginForAccessToken(body: ILoginRequest): Observable<ILoginResponse> {
    const fd = new FormData();
    fd.append('username', body.username);
    fd.append('password', body.password);

    return this.http.post<ILoginResponse>(`${this.baseApiUrl}/token`, fd).pipe(tap((value) => this.saveTokens(value)));
  }

  refreshToken(body: IRefreshTokenRequest): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${this.baseApiUrl}/refresh`, body)
      .pipe(tap((value) => this.saveTokens(value)));
  }

  logout(): Observable<string> {
    return this.http.post<string>(`${this.baseApiUrl}/logout`, {}).pipe(
      tap(() => {
        this.cookieService.deleteAll();
      }),
    );
  }

  private saveTokens(value: ILoginResponse): void {
    this.cookieService.set('token', value.access_token);
    this.cookieService.set('refresh_token', value.refresh_token);
  }
}
