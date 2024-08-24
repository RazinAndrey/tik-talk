import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  http = inject(HttpClient);
  cookiesService = inject(CookieService);

  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth(){
    if(!this.token){
      this.token = this.cookiesService.get('token');
    }
    return !! this.token;
  }

  login(payload: {username: string, password: string}){
    
    const fd: FormData = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd) 
      .pipe(
        tap(val => {
          this.token = val.access_token;
          this.refreshToken = val.refresh_token;
          
          this.cookiesService.set('token', this.token);
          this.cookiesService.set('refresh', this.refreshToken);
        })
    );
  }
}
