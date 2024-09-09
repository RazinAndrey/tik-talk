import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  http = inject(HttpClient);
  cookiesService = inject(CookieService);
  router = inject(Router);

  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth(){
    if(!this.token){
      this.token = this.cookiesService.get('token');
      this.refreshToken = this.cookiesService.get('refreshToken');
    }
    return !! this.token;
  }

  login(payload: {username: string | null, password: string | null}){

    if(payload.username === null || payload.password === null){
      return;
    }
    
    const fd: FormData = new FormData();

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd) 
      .pipe(
        tap(tokens => this.saveTokens(tokens))
    );
  }


  refreshAuthToken(){
    return this.http.post<TokenResponse>( 
      `${this.baseApiUrl}refresh`,
      {
        refresh_token: this.refreshToken
      }
    ).pipe(
        tap(tokens => this.saveTokens(tokens)),
        catchError(err => { 
          this.logout();
          return throwError(() => err); 
        })
      )
  }


  logout(){
    this.cookiesService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['login']);
  }


  saveTokens(res: TokenResponse){
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookiesService.set('token', this.token);
    this.cookiesService.set('refreshToken', this.refreshToken);
  }
}
