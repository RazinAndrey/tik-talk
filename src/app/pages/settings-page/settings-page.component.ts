import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InputFormComponent } from '../../shared/ui/input-form/input-form.component';
import { ProfileHeaderComponent } from '../../shared/ui/profile-header/profile-header.component';
import { AccountService } from '../../core/api/account.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [InputFormComponent, ProfileHeaderComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {}
