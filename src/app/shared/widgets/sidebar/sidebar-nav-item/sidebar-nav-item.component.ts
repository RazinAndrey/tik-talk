import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItem } from '../sidebar.component';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../../../ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-sidebar-nav-item',
  standalone: true,
  imports: [SvgIconComponent, RouterLink],
  templateUrl: './sidebar-nav-item.component.html',
  styleUrl: './sidebar-nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarNavItemComponent {
  item = input.required<MenuItem>();
}
