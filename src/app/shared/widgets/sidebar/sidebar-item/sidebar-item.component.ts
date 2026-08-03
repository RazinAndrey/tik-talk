import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItem } from '../sidebar.component';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../../../ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [SvgIconComponent, RouterLink],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent {
  item = input.required<MenuItem>();
}
