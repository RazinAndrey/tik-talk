import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../core/api/auth.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  authService = inject(AuthService);
}
