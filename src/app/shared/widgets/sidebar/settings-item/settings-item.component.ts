import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IAccount } from '../../../../core/interfaces/api/account.model';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';
import { SvgIconComponent } from '../../../ui/svg-icon/svg-icon.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-settings-item',
  standalone: true,
  imports: [ImgUrlPipe, RouterLink, SvgIconComponent, NgOptimizedImage],
  templateUrl: './settings-item.component.html',
  styleUrls: [
    './settings-item.component.scss',
    '../sidebar-item/sidebar-item.component.scss',
    '../subscriber-card/subscriber-card.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsItemComponent {
  profile = input.required<IAccount>();
}
