import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAccount } from '../interfaces/api/account.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  private baseApiUrl = `${environment.apiUrl}/account`;

  getTestAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${this.baseApiUrl}/test_accounts`);
  }

  getMe(): Observable<IAccount> {
    return this.http.get<IAccount>(`${this.baseApiUrl}/me`);
  }
}
