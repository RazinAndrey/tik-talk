import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IAccount, IGetSubscribers, Pageble } from '../interfaces/api/account.model';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environment';
import { SignalStoreService } from '../services/signal-store';

interface IAccountState {
  profiles: IAccount[];
}

@Injectable({
  providedIn: 'root',
})
export class AccountService extends SignalStoreService<IAccountState> {
  private http = inject(HttpClient);

  private baseApiUrl = `${environment.apiUrl}/account`;

  readonly me = signal<IAccount | null>(null);
  readonly subscribers = signal<Pageble<IAccount> | null>(null);

  getTestAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${this.baseApiUrl}/test_accounts`);
  }

  getMe(): Observable<IAccount> {
    return this.http.get<IAccount>(`${this.baseApiUrl}/me`).pipe(tap((account) => this.me.set(account)));
  }

  updateMe(account: Partial<IAccount>): Observable<IAccount> {
    return this.http.patch<IAccount>(`${this.baseApiUrl}/me`, account);
  }

  // Aккаунты

  getAccount(account_id: number): Observable<IAccount> {
    return this.http.get<IAccount>(`${this.baseApiUrl}/${account_id}`);
  }

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(`${this.baseApiUrl}/accounts`);
  }

  // Подписчики

  getSubscribers(data: Partial<IGetSubscribers>): Observable<Pageble<IAccount>> {
    let params = new HttpParams();
    if (data.size) {
      params = params.set('size', data.size.toString());
    }
    return this.http
      .get<Pageble<IAccount>>(`${this.baseApiUrl}/subscribers/${data.account_id}`, { params })
      .pipe(tap((result) => this.subscribers.set(result)));
  }
}
