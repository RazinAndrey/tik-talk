import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgOptimizedImage, ImgUrlPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  readonly avatarUrl = input.required<string>();
  readonly height = input.required<number>();
  readonly width = input.required<number>();
}
