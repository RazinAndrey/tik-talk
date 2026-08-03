import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IAccount } from '../../../../core/interfaces/api/account.model';
import { NgOptimizedImage } from '@angular/common';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [NgOptimizedImage, ImgUrlPipe, RouterLink],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriberCardComponent {
  profile = input.required<IAccount>();
}
