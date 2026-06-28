import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginRequest, ILoginResponse } from '../interfaces/api/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private baseApiUrl = 'https://icherniakov.ru/yt-course/auth';

  login(body: ILoginRequest): Observable<ILoginResponse> {
    const fd = new FormData();
    fd.append('username', body.username);
    fd.append('username', body.password);

    return this.http.post<ILoginResponse>(`${this.baseApiUrl}/token`, fd);
  }
}
