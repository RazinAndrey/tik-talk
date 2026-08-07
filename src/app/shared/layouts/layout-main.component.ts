import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AccountService } from '../../core/api/account.service';
import { switchMap } from 'rxjs';
import { SvgIconComponent } from '../ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, SvgIconComponent],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutMainComponent implements OnInit {
  private accountService = inject(AccountService);

  readonly sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  ngOnInit(): void {
    this.accountService.getMe().subscribe();
  }
}
