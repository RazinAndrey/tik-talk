import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AccountService } from '../../core/api/account.service';
import { ProfileCardComponent } from '../../shared/widgets/profile-card/profile-card.component';
import { IAccount } from '../../core/interfaces/api/account.model';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent implements OnInit {
  private accountService = inject(AccountService);
  readonly accounts = signal<IAccount[]>([]);

  ngOnInit(): void {
    this.accountService.getTestAccounts().subscribe((value) => {
      this.accounts.set(value);
    });
  }
}
