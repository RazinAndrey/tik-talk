import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../widgets/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AccountService } from '../../core/api/account.service';

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
    this.accountService.getMe().subscribe();
  }
}
