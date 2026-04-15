import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Account } from '../../../core/interfaces/api/account.model';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe, NgOptimizedImage],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  readonly account = input.required<Account>();
}
