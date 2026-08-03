import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AccountService } from '../../core/api/account.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutMainComponent implements OnInit {
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.accountService
      .getMe()
      .pipe(
        switchMap((account) => {
          return this.accountService.getSubscribers({ account_id: account.id });
        }),
      )
      .subscribe();
  }
}
