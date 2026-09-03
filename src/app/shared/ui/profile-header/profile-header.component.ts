import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IAccount } from '../../../core/interfaces/api/account.model';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  profile = input.required<IAccount>();
}
