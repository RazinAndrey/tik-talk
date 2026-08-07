import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { AccountService } from '../../../core/api/account.service';
import { IAccount } from '../../../core/interfaces/api/account.model';
import { SettingsItemComponent } from './settings-item/settings-item.component';
import { filter, map, Observable, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { LoaderComponent } from '../../ui/loader/loader.component';

export type MenuItem = {
  label: string;
  icon: string;
  link: string;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SidebarItemComponent,
    SettingsItemComponent,
    AsyncPipe,
    SubscriberCardComponent,
    LoaderComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private accountService = inject(AccountService);

  readonly me = computed(() => this.accountService.me());
  subscribers$: Observable<IAccount[] | null> = toObservable(this.me).pipe(
    filter((me) => !!me?.id),
    switchMap((me) =>
      this.accountService.getSubscribers({ account_id: me?.id, size: 3 }).pipe(map((subscribers) => subscribers.items)),
    ),
  );
  readonly loaderSubscribers = Array.from({ length: 3 });

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
}
