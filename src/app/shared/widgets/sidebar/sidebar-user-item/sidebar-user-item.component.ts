import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IAccount } from '../../../../core/interfaces/api/account.model';
import { NgOptimizedImage } from '@angular/common';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../../../ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-sidebar-user-item',
  standalone: true,
  imports: [NgOptimizedImage, ImgUrlPipe, RouterLink, SvgIconComponent],
  templateUrl: './sidebar-user-item.component.html',
  styleUrl: './sidebar-user-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarUserItemComponent {
  profile = input.required<IAccount>();
  link = input.required<string>();
  showIconSettings = input(false);
}
