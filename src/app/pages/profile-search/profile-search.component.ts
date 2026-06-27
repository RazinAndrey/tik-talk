import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { Account } from '../../core/interfaces/api/account.model';

@Component({
  selector: 'app-profile-search',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './profile-search.component.html',
  styleUrl: './profile-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSearchComponent implements OnInit {
  private accountService = inject(AccountService);
  readonly accounts = signal<Account[]>([]);

  ngOnInit(): void {
    this.accountService.getTestAccounts().subscribe((value) => {
      this.accounts.set(value);
    });
  }
}
