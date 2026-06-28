import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../../widgets/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutMainComponent {}
