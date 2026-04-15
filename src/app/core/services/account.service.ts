import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Account } from '../interfaces/api/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  private baseApiUrl = 'https://icherniakov.ru/yt-course';

  getTestAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseApiUrl}/account/test_accounts`);
  }
}
