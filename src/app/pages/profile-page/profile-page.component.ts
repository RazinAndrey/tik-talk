import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../core/api/auth.service';
import { AccountService } from '../../core/api/account.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ProfileHeaderComponent } from '../../shared/ui/profile-header/profile-header.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { AvatarComponent } from '../../shared/ui/avatar/avatar.component';
import { LoaderComponent } from '../../shared/ui/loader/loader.component';
import { SkillTagComponent } from '../../shared/ui/skill-tag/skill-tag.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    AsyncPipe,
    ProfileHeaderComponent,
    ButtonComponent,
    NgOptimizedImage,
    RouterLink,
    AvatarComponent,
    LoaderComponent,
    SkillTagComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  private readonly authService = inject(AuthService);
  private readonly accountService = inject(AccountService);
  private readonly route = inject(ActivatedRoute);

  private me$ = toObservable(this.accountService.me);
  private mySubscribers$ = toObservable(this.accountService.subscribers);

  readonly profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.me$;
      }

      return this.accountService.getAccount(id);
    }),
  );

  readonly subscribers$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.mySubscribers$;
      }

      return this.accountService.getSubscribers({ account_id: id, size: 6 });
    }),
  );

  readonly skeletons = Array(6);

  hasValidStack(stack: string[]): boolean {
    return !!stack?.length && stack.every((value) => value.trim().length > 0);
  }
}
