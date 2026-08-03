import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../../ui/svg-icon/svg-icon.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { AccountService } from '../../../core/api/account.service';
import { IAccount } from '../../../core/interfaces/api/account.model';
import { SettingsItemComponent } from './settings-item/settings-item.component';
import { map } from 'rxjs';

export type MenuItem = {
  label: string;
  icon: string;
  link: string;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgOptimizedImage, SidebarItemComponent, SettingsItemComponent, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  private accountService = inject(AccountService);

  readonly profile = signal<IAccount | null>(this.accountService.me());
  subscribers$ = this.accountService
    .getSubscribers({ account_id: this.accountService.me()?.id || 0 })
    .pipe(map((result) => result.items));

  readonly menuItems: MenuItem[] = [
    {
      label: 'Моя страница',
      icon: 'my-page',
      link: '/profile',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: '/chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
  ];

  readonly settingsItem: MenuItem = {
    label: 'Настройки',
    icon: 'settings',
    link: '/settings',
  };

  ngOnInit(): void {}
}
