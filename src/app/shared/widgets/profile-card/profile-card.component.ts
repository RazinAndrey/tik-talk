import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IAccount } from '../../../core/interfaces/api/account.model';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { SkillTagComponent } from '../../ui/skill-tag/skill-tag.component';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, ImgUrlPipe, SkillTagComponent, ButtonComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  readonly account = input.required<IAccount>();
}
