import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAccount } from '../interfaces/api/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  private baseApiUrl = 'https://icherniakov.ru/yt-course';

  getTestAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${this.baseApiUrl}/account/test_accounts`);
  }
}
