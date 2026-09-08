import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { InputFormComponent } from '../../shared/ui/form-controls/input-form/input-form.component';
import { ProfileHeaderComponent } from '../../shared/ui/profile-header/profile-header.component';
import { AccountService } from '../../core/api/account.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [InputFormComponent, ProfileHeaderComponent, ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly accountService = inject(AccountService);

  readonly formSettings = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    const me = this.accountService.me();

    if (!me) {
      return;
    }

    this.formSettings.patchValue({
      firstName: me.firstName,
      lastName: me.lastName,
      username: me.username,
      description: me.description,
    });
  }

  onSave(): void {
    this.formSettings.markAllAsTouched();
    this.formSettings.updateValueAndValidity();

    if (this.formSettings.invalid) {
      return;
    }

    const formSettings = this.formSettings.getRawValue();

    this.accountService
      .updateMe({
        firstName: formSettings.firstName ?? '',
        lastName: formSettings.lastName ?? '',
        description: formSettings.description ?? '',
      })
      .subscribe();
  }
}
